"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { ConfirmationModal } from "./components/ConfirmationModal";
import FormTabs from "./components/FormTabs";
import { LoadingModal } from "./components/LoadingModal";
import AdditionalSection from "./components/form-sections/AdditionalSection";
import AgreementsSection from "./components/form-sections/AgreementsSection";
import AppreciationSection from "./components/form-sections/AppreciationSection";
import FamilySection from "./components/form-sections/FamilySection";
import GeneralSection from "./components/form-sections/GeneralSection";
import RisksSection from "./components/form-sections/RisksSection";
import StudentSection from "./components/form-sections/StudentSection";
import { AutocompleteProvider, useAutocomplete } from "./context/AutocompleteContext";
import { FormFillProvider, useFormFillContext } from "./context/FormFillContext";
import { generateSummary } from "./utils/aiService";

type FormData = Record<string, Record<string, any>>;

export default function RegistroForm() {
  return (
    <AutocompleteProvider>
      <FormFillProvider>
        <RegistroFormContent />
      </FormFillProvider>
    </AutocompleteProvider>
  );
}

function RegistroFormContent() {
  const { fillFormWithData } = useFormFillContext();
  const autocompleteData = useAutocomplete();
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [studentsData, setStudentsData] = useState<Record<string, any>>({});
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStages, setLoadingStages] = useState([
    {
      title: "Preparando el registro",
      description: "Organizando la información ingresada...",
      isActive: false,
      isCompleted: false,
    },
    {
      title: "Generando resumen con IA",
      description: "Procesando el relato del estudiante...",
      isActive: false,
      isCompleted: false,
    },
    {
      title: "Guardando registro",
      description: "Almacenando toda la información...",
      isActive: false,
      isCompleted: false,
    },
  ]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const updateLoadingStage = (index: number, isActive: boolean, isCompleted: boolean) => {
    setLoadingStages((prev) =>
      prev.map((stage, i) => {
        if (i === index) {
          return { ...stage, isActive, isCompleted };
        }
        return stage;
      })
    );
  };

  useEffect(() => {
    if (autocompleteData && !formData) {
      setFormData({
        general: {
          fechaAtencion: new Date().toISOString(),
          municipio: autocompleteData.municipio.default || "",
          nombreEstablecimiento: autocompleteData.institucion.default || "",
          codigoDane: autocompleteData.dane.default || "",
          sede: autocompleteData.sede.default || "",
          remitidoPor: autocompleteData.remitidoPor.default || "",
          nombreRemitente: autocompleteData.nombreRemitidoPor.default || "",
          posiblesMotivos:
            autocompleteData.posiblesMotivosDeAtencion.default || "",
          lineaAtencion: autocompleteData.lineaDeAtencion.default || "",
          tipoAtencion: autocompleteData.tipoDeAtencion.default || "",
          entidadSalud: autocompleteData.entidadPrestadoraDeSalud.default || "",
          personaConfianza: "",
        },
        student: {
          nombreCompleto: "",
          tipoDocumento: autocompleteData.tipoDocumentoEstudiante.default || "",
          numeroDocumento: "",
          gradoEscolaridad: autocompleteData.gradoEscolaridad.default || "",
          numeroTelefono: "",
          eps: autocompleteData.entidadPrestadoraDeSalud.default || "",
          edad: "",
          fechaNacimiento: null,
          lugarNacimiento: "",
          acudienteParentesco: autocompleteData.parentesco.default || "",
          telefonoAcudiente: "",
          documentoAcudiente: "",
          direccionAcudiente: "",
        },
        family: {
          sexo: autocompleteData.sexo.default || "",
          genero: autocompleteData.genero.default || "",
          parentesco: autocompleteData.parentesco.default || "",
          ocupacionFamiliar: autocompleteData.ocupacion.default || "",
          nivelEducativoFamiliar: autocompleteData.nivelEducativo.default || "",
          estadoCivilFamiliar: autocompleteData.estadoCivil.default || "",
          tipoFamilia: autocompleteData.tipoFamilia.default || "",
          condicionDiscapacidad: "",
          tipoDiscapacidad: "",
          talentoYCapacidadesExepcionales: "",
        },
        agreements: {
          expectativasEntrevistado: "",
          acuerdosPrevios: {
            files: [],
            preview: [],
          },
        },
        risks: {
          condicionDiscapacidad: "",
          tipoDiscapacidad: "",
          talentoCapacidades: "",
          relatoEntrevistado: "",
        },
        appreciation: {
          observaciones: "",
          activacionRuta: "",
          procesosConvivencia: "",
        },
        additional: {
          fechaProximoSeguimiento: null,
          remision: {
            files: [],
            preview: [],
          },
          piar: {
            files: [],
            preview: [],
          },
          estadoDelCaso: "",
          compromisoPadres: {
            files: [],
            preview: [],
          },
          compromisoEstudiantes: {
            files: [],
            preview: [],
          },
          nombreQuienRealiza: "",
        },
      });
    }
  }, [autocompleteData, formData]);

  useEffect(() => {
    const fetchStudentsData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/lista-estudiantes/",
        );
        setStudentsData(response.data);
      } catch (error) {
        console.error("Failed to fetch students data:", error);
      }
    };

    fetchStudentsData();
  }, []);

  const memoizedOptions = useMemo(() => {
    if (!autocompleteData) return {};

    return {
      municipio: autocompleteData.municipio.opciones,
      institucion: autocompleteData.institucion.opciones,
      dane: autocompleteData.dane.opciones,
      sede: autocompleteData.sede.opciones,
      remitidoPor: autocompleteData.remitidoPor.opciones,
      nombreRemitidoPor: autocompleteData.nombreRemitidoPor.opciones,
      posiblesMotivosDeAtencion:
        autocompleteData.posiblesMotivosDeAtencion.opciones,
      lineaDeAtencion: autocompleteData.lineaDeAtencion.opciones,
      tipoDeAtencion: autocompleteData.tipoDeAtencion.opciones,
      entidadPrestadoraDeSalud:
        autocompleteData.entidadPrestadoraDeSalud.opciones,
      nombreEstudiante: autocompleteData.nombreEstudiante.opciones,
      tipoDocumentoEstudiante:
        autocompleteData.tipoDocumentoEstudiante.opciones,
      gradoEscolaridad: autocompleteData.gradoEscolaridad.opciones,
      sexo: autocompleteData.sexo.opciones,
      genero: autocompleteData.genero.opciones,
      parentesco: autocompleteData.parentesco.opciones,
      ocupacion: autocompleteData.ocupacion.opciones,
      nivelEducativo: autocompleteData.nivelEducativo.opciones,
      estadoCivil: autocompleteData.estadoCivil.opciones,
      tipoFamilia: autocompleteData.tipoFamilia.opciones,
      condicionDiscapacidad: autocompleteData.condicionDiscapacidad.opciones,
      tipoDiscapacidad: autocompleteData.tipoDiscapacidad.opciones,
      talentoYCapacidadesExepcionales:
        autocompleteData.talentoYCapacidadesExepcionales.opciones,
      activacionRuta: autocompleteData.activacionRuta.opciones,
      estadoCaso: autocompleteData.estadoCaso.opciones,
      nombreOrientadora: autocompleteData.nombreOrientadora.opciones,
    };
  }, [autocompleteData]);

  const handleChange = (section: string, field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return prev;

      // Si es un campo de archivo (FileList)
      if (value instanceof FileList) {
        const files = Array.from(value);

        // Solo revocar URLs si realmente estamos reemplazando archivos
        if (files.length > 0) {
          // Revocar URLs antiguas solo del campo específico
          if (prev[section][field]?.preview) {
            prev[section][field].preview.forEach(URL.revokeObjectURL);
          }

          // Crear nuevas URLs de vista previa
          const previews = files.map((file) => URL.createObjectURL(file));

          return {
            ...prev,
            [section]: {
              ...prev[section],
              [field]: {
                files,
                preview: previews,
              },
            },
          };
        }
        return prev; // No modificar el estado si no hay nuevos archivos
      }

      // Para otros campos
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      };
    });
  };

  const handleStudentChange = (section: string, field: string, value: any) => {
    handleChange(section, field, value);
    if (field === "nombreCompleto" && studentsData[value]) {
      const studentInfo = studentsData[value];
      handleChange("student", "tipoDocumento", studentInfo.tipoDocumento);
      handleChange("student", "numeroDocumento", studentInfo.numeroDocumento);
      handleChange("student", "eps", studentInfo.eps);
      handleChange("student", "fechaNacimiento", studentInfo.fechaNacimiento);
      handleChange("student", "lugarNacimiento", studentInfo.lugarNacimiento);
      handleChange("student", "gradoEscolaridad", studentInfo.gradoEscolaridad);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData?.student.nombreCompleto) {
      toast({
        title: "Campo requerido",
        description: "El nombre completo del estudiante es obligatorio.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    updateLoadingStage(0, true, false);

    try {
      // Preparar datos
      const formDataObj = new FormData();
      updateLoadingStage(0, false, true);
      updateLoadingStage(1, true, false);

      // Generar resumen con IA
      const summary = await generateSummary(formData.risks.relatoEntrevistado);
      if (!summary) {
        setIsSubmitting(false);
        return;
      }
      updateLoadingStage(1, false, true);
      updateLoadingStage(2, true, false);

      // Flatten the form data structure and convert to camelCase
      const flattenedData = {
        // General section
        fecha: formData.general.fechaAtencion,
        municipio: formData.general.municipio,
        institucion: formData.general.nombreEstablecimiento,
        dane: formData.general.codigoDane,
        sede: formData.general.sede,
        remitidoPor: formData.general.remitidoPor,
        nombreRemitidoPor: formData.general.nombreRemitente,
        posiblesMotivosDeAtencion: formData.general.posiblesMotivos,
        lineaDeAtencion: formData.general.lineaAtencion,
        tipoDeAtencion: formData.general.tipoAtencion,
        entidadPrestadoraDeSalud: formData.general.entidadSalud,
        personaDeConfianza: formData.general.personaConfianza,

        // Student section
        nombreEstudiante: formData.student.nombreCompleto,
        tipoDocumentoEstudiante: formData.student.tipoDocumento,
        numeroDocumentoEstudiante: formData.student.numeroDocumento,
        gradoEscolaridad: formData.student.gradoEscolaridad,
        numeroTelefonoEstudiante: formData.student.numeroTelefono,
        epsEstudiante: formData.student.eps,
        edadEstudiante: formData.student.edad,
        fechaNacimientoEstudiante: formData.student.fechaNacimiento,
        lugarNacimientoEstudiante: formData.student.lugarNacimiento,
        parentescoAcudiente: formData.student.acudienteParentesco,
        telefonoAcudiente: formData.student.telefonoAcudiente,
        documentoAcudiente: formData.student.documentoAcudiente,
        direccion: formData.student.direccionAcudiente,

        // Family section
        sexo: formData.family.sexo,
        genero: formData.family.genero,
        parentesco: formData.family.parentesco,
        nombre: formData.family.nombreFamiliar,
        edad: formData.family.edadFamiliar,
        ocupacion: formData.family.ocupacionFamiliar,
        nivelEducativo: formData.family.nivelEducativoFamiliar,
        estadoCivil: formData.family.estadoCivilFamiliar,
        numeroHijos: formData.family.numeroHijosFamiliar,
        telefono: formData.family.telefonoFamiliar,
        lugarResidencia: formData.family.lugarResidenciaFamiliar,
        tipoFamilia: formData.family.tipoFamilia,
        hogarYBienestar: formData.family.hogarYBienestar,

        // Agreements section
        espectativasEntrevistado: formData.agreements.expectativasEntrevistado,

        // Risks section
        condicionDiscapacidad: formData.risks.condicionDiscapacidad,
        tipoDiscapacidad: formData.risks.tipoDiscapacidad,
        talentoYCapacidadesExepcionales: formData.risks.talentoCapacidades,

        // Appreciation section
        relatoEntrevistado: formData.risks.relatoEntrevistado,
        resumen: summary,
        observaciones: formData.appreciation.observaciones,
        activacionRuta: formData.appreciation.activacionRuta,
        procesosConvivencia: formData.appreciation.procesosConvivencia,

        // Additional section
        fechaProximoSeguimiento: formData.additional.fechaProximoSeguimiento,
        estadoCaso: formData.additional.estadoDelCaso,
        nombreOrientadora: formData.additional.nombreQuienRealiza,
      };

      formDataObj.append("json_data", JSON.stringify(flattenedData));

      // Append files
      const appendFiles = (fieldName: string, fileData: { files: File[] }) => {
        if (fileData?.files?.length > 0) {
          fileData.files.forEach((file, index) => {
            formDataObj.append(`${fieldName}`, file);
          });
        }
      };

      appendFiles("acuerdos_previos", formData.agreements.acuerdosPrevios);
      appendFiles("remision", formData.additional.remision);
      appendFiles("piar", formData.additional.piar);
      appendFiles("compromiso_padres", formData.additional.compromisoPadres);
      appendFiles(
        "compromiso_estudiantes",
        formData.additional.compromisoEstudiantes,
      );

      const response = await axios.post(
        "http://127.0.0.1:8000/api/registros/",
        formDataObj,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.status === 201) {
        updateLoadingStage(2, false, true);

        // Short delay for visual feedback
        await new Promise(resolve => setTimeout(resolve, 500));

        setFormData(null);
        const studentName = formData.student.nombreCompleto;
        router.push(`/student/${studentName}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Error al enviar el formulario");
      toast({
        title: "Error",
        description: "Error al enviar el formulario.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    const tagName = target.tagName.toLowerCase();
    const isRichText = target.getAttribute("contenteditable") === "true";

    if (e.key === "Enter" && !isRichText && tagName !== "textarea") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    return () => {
      if (formData) {
        // Lista de campos de archivo por sección
        const fileFields = {
          agreements: ["acuerdosPrevios"],
          additional: [
            "remision",
            "piar",
            "compromisoPadres",
            "compromisoEstudiantes",
          ],
        };

        // Limpiar URLs de vista previa solo al desmontar el componente
        Object.entries(fileFields).forEach(([section, fields]) => {
          fields.forEach((field) => {
            const fieldData = formData[section]?.[field];
            if (fieldData?.preview?.length > 0) {
              fieldData.preview.forEach((url) => {
                try {
                  URL.revokeObjectURL(url);
                } catch (e) {
                  console.warn("Error al revocar URL:", e);
                }
              });
            }
          });
        });
      }
    };
  }, []); // Solo se ejecuta al desmontar

  // Al cambiar de pestaña, mantener las URLs de vista previa
  const handleTabChange = (tab: string) => {
    // No hacer nada aquí, simplemente dejar que las URLs persistan
  };

  // Agrega esta función para exponer el llenado del formulario
  const previewFormData = async (jsonData: any) => {
    fillFormWithData(jsonData);
  };

  const handleCancelClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmReset = () => {
    window.location.reload();
  };

  if (error) {
    return (
      <div className="container mx-auto p-6 text-red-500">Error: {error}</div>
    );
  }

  if (!autocompleteData || !formData) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-8">
      {isSubmitting && <LoadingModal stages={loadingStages} />}
      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmReset}
      />
      <div className={`max-h-screen overflow-y-auto ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}>
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          {/* Header with gradient */}
          <div className="mb-8 my-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg p-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              Registro de Atención
            </h1>
          </div>

          <Tabs
            defaultValue="general"
            className="space-y-6"
            onValueChange={handleTabChange}
          >
            <FormTabs />

            <TabsContent value="general">
              <GeneralSection
                formData={formData}
                handleChange={handleChange}
                memoizedOptions={memoizedOptions}
              />
            </TabsContent>

            <TabsContent value="student">
              <StudentSection
                formData={formData}
                handleChange={handleChange}
                handleStudentChange={handleStudentChange}
                memoizedOptions={memoizedOptions}
              />
            </TabsContent>

            <TabsContent value="family">
              <FamilySection
                formData={formData}
                handleChange={handleChange}
                memoizedOptions={memoizedOptions}
              />
            </TabsContent>

            <TabsContent value="agreements">
              <AgreementsSection
                formData={formData}
                handleChange={handleChange}
              />
            </TabsContent>

            <TabsContent value="risks">
              <RisksSection
                formData={formData}
                handleChange={handleChange}
                memoizedOptions={memoizedOptions}
              />
            </TabsContent>

            <TabsContent value="appreciation">
              <AppreciationSection
                formData={formData}
                handleChange={handleChange}
                memoizedOptions={memoizedOptions}
              />
            </TabsContent>

            <TabsContent value="additional">
              <AdditionalSection
                formData={formData}
                handleChange={handleChange}
                memoizedOptions={memoizedOptions}
              />
            </TabsContent>
          </Tabs>

          <div className="mt-8 mb-12 flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelClick}
              className="border-2 rounded-lg border-indigo-100 hover:border-indigo-200 transition-all duration-200 px-8 py-4 text-lg"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r rounded-lg from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 px-8 py-4 text-lg"
            >
              Registrar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
