import { useState, useEffect } from "react";
import { FormData } from "../types/form";
import { RegistroFormService } from "../services/RegistroFormService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { getCurrentColombiaDateTime } from "@/utils/date";

const initialStages = [
  {
    title: "Procesando datos",
    description: "Validando la información ingresada",
    isActive: true,
    isCompleted: false,
  },
  {
    title: "Generando resumen",
    description: "Utilizando IA para sintetizar la información",
    isActive: false,
    isCompleted: false,
  },
  {
    title: "Guardando registro",
    description: "Almacenando la información en la base de datos",
    isActive: false,
    isCompleted: false,
  },
];

const initialFormData: FormData = {
  general: {
    fecha: getCurrentColombiaDateTime().toISOString(),
    remitidoPor: "",
    nombreRemitidoPor: "",
    posiblesMotivosDeAtencion: "",
    lineaDeAtencion: "",
    tipoDeAtencion: "",
  },
  story: {
    relatoEntrevistado: "",
    expectativasEntrevistado: "",
    acuerdosPrevios: {
      files: [],
      preview: [],
    },
  },
  conclusion: {
    observaciones: "",
    activacionRuta: "",
    procesosConvivencia: "",
    remision: {
      files: [],
      preview: [],
    },
    estadoCaso: "",
    fechaProximoSeguimiento: "",
    nombreOrientadora: "",
  },
  student: {
    id: 0,
    nombreCompleto: "",
  },
  resumen: "",
};

export function useRegistroForm(
  studentData: { id: string; nombreEstudiante: string } | null,
  registroId?: string,
) {
  const [formData, setFormData] = useState<FormData>({
    ...initialFormData,
    student: {
      id: studentData?.id ? Number(studentData.id) : 0,
      nombreCompleto: studentData?.nombreEstudiante || "",
    },
  });
  const [files, setFiles] = useState<{ [key: string]: File[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stages, setStages] = useState(initialStages);
  const { toast } = useToast();
  const router = useRouter();

  // Update form data when student data changes
  useEffect(() => {
    if (studentData) {
      setFormData((prev) => ({
        ...prev,
        student: {
          id: Number(studentData.id),
          nombreCompleto: studentData.nombreEstudiante,
        },
      }));
    }
  }, [studentData]);

  useEffect(() => {
    const loadRegistro = async () => {
      if (registroId) {
        try {
          const loadedData = await RegistroFormService.loadRegistro(registroId);
          setFormData(loadedData);
        } catch (error) {
          console.error("Error loading registro:", error);
          toast({
            title: "Error",
            description: "No se pudo cargar el registro",
            variant: "destructive",
          });
        }
      }
    };

    if (registroId) {
      loadRegistro();
    }
  }, [registroId]);

  const updateStages = (index: number) => {
    setStages((prev) =>
      prev.map((stage, i) => ({
        ...stage,
        isActive: i === index,
        isCompleted: i < index,
      })),
    );
  };

  const handleFieldChange = async (field: string, value: any) => {
    try {
      // Handle file fields
      if (value instanceof FileList || Array.isArray(value)) {
        if (field.includes("files")) {
          setFiles((prev) => ({
            ...prev,
            [field]: Array.isArray(value) ? value : Array.from(value),
          }));
        }
      }

      // Update form data through the service
      const updatedData = await RegistroFormService.handleFieldUpdate(
        field,
        value,
        formData,
      );
      setFormData(updatedData);
    } catch (error) {
      console.error("Error updating field:", error);
      toast({
        title: "Error",
        description: "No se pudo actualizar el campo",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      updateStages(0);

      // Process stages
      await new Promise((r) => setTimeout(r, 1000));
      updateStages(1);
      await new Promise((r) => setTimeout(r, 1500));
      updateStages(2);

      await RegistroFormService.submitForm(formData, files, registroId);

      toast({
        title: "Éxito",
        description: registroId
          ? "Registro actualizado correctamente"
          : "Registro creado correctamente",
      });
      router.push(`/student/${formData.student.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: registroId
          ? "Error al actualizar el registro"
          : "Error al crear el registro",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    stages,
    handleFieldChange,
    handleSubmit,
  };
}
