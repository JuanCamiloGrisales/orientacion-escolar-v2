import { useState } from "react";
import { FormData } from "../types/types";

export const formFillService = {
  validateData: (data: any) => {
    return data && typeof data === "object";
  },

  fillForm: (data: any): FormData => {
    // Función auxiliar para procesar archivos
    const processFiles = (files: any[] = []) => ({
      files: [],
      preview: files.map((file) => file.archivo),
    });

    return {
      general: {
        fechaAtencion: data.fecha || "",
        municipio: data.municipio || "",
        nombreEstablecimiento: data.institucion || "",
        codigoDane: data.dane || "",
        sede: data.sede || "",
        remitidoPor: data.remitidoPor || "",
        nombreRemitente: data.nombreRemitidoPor || "",
        posiblesMotivos: data.posiblesMotivosDeAtencion || "",
        lineaAtencion: data.lineaDeAtencion || "",
        tipoAtencion: data.tipoDeAtencion || "",
        entidadSalud: data.entidadPrestadoraDeSalud || "",
        personaConfianza: data.personaDeConfianza || "",
      },
      student: {
        nombreCompleto: data.nombreEstudiante || "",
        tipoDocumento: data.tipoDocumentoEstudiante || "",
        numeroDocumento: data.numeroDocumentoEstudiante || "",
        gradoEscolaridad: data.gradoEscolaridad || "",
        numeroTelefono: data.numeroTelefonoEstudiante || "",
        eps: data.epsEstudiante || "",
        edad: data.edadEstudiante || "",
        fechaNacimiento: data.fechaNacimientoEstudiante || null,
        lugarNacimiento: data.lugarNacimientoEstudiante || "",
        acudienteParentesco: data.parentescoAcudiente || "",
        telefonoAcudiente: data.telefonoAcudiente || "",
        documentoAcudiente: data.documentoAcudiente || "",
        direccionAcudiente: data.direccion || "",
      },
      family: {
        sexo: data.sexo || "",
        genero: data.genero || "",
        parentesco: data.parentesco || "",
        nombreFamiliar: data.nombre || "",
        edadFamiliar: data.edad || "",
        ocupacionFamiliar: data.ocupacion || "",
        nivelEducativoFamiliar: data.nivelEducativo || "",
        estadoCivilFamiliar: data.estadoCivil || "",
        numeroHijosFamiliar: data.numeroHijos || "",
        telefonoFamiliar: data.telefono || "",
        lugarResidenciaFamiliar: data.lugarResidencia || "",
        tipoFamilia: data.tipoFamilia || "",
        hogarYBienestar: data.hogarYBienestar || "",
      },
      agreements: {
        expectativasEntrevistado: data.espectativasEntrevistado || "",
        acuerdosPrevios: processFiles(data.acuerdosPrevios),
      },
      risks: {
        condicionDiscapacidad: data.condicionDiscapacidad || "",
        tipoDiscapacidad: data.tipoDiscapacidad || "",
        talentoCapacidades: data.talentoYCapacidadesExepcionales || "",
        relatoEntrevistado: data.relatoEntrevistado || "",
      },
      appreciation: {
        observaciones: data.observaciones || "",
        activacionRuta: data.activacionRuta || "",
        procesosConvivencia: data.procesosConvivencia || "",
      },
      additional: {
        fechaProximoSeguimiento: data.fechaProximoSeguimiento || null,
        remision: processFiles(data.remision),
        piar: processFiles(data.piar),
        estadoDelCaso: data.estadoCaso || "",
        compromisoPadres: processFiles(data.compromisoPadres),
        compromisoEstudiantes: processFiles(data.compromisoEstudiantes),
        nombreQuienRealiza: data.nombreOrientadora || "",
      },
    };
  },
};

export function useFormFill() {
  const [formData, setFormData] = useState<FormData | null>(null);

  const fillFormWithData = (data: any) => {
    if (formFillService.validateData(data)) {
      const transformedData = formFillService.fillForm(data);
      setFormData(transformedData);
    }
  };

  return { formData, fillFormWithData, formFillService };
}
