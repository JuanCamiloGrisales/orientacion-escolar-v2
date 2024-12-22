import { FormData } from "../types/form";

export class RegistroDataAdapter {
  static toAPI(formData: FormData): any {
    if (!formData.student?.id) {
      throw new Error("Student ID is required");
    }

    return {
      estudiante: formData.student.id,
      fecha: formData.general.fecha,
      remitidoPor: formData.general.remitidoPor,
      nombreRemitidoPor: formData.general.nombreRemitidoPor,
      posiblesMotivosDeAtencion: formData.general.posiblesMotivosDeAtencion,
      lineaDeAtencion: formData.general.lineaDeAtencion,
      tipoDeAtencion: formData.general.tipoDeAtencion,
      relatoEntrevistado: formData.story.relatoEntrevistado,
      expectativasEntrevistado: formData.story.expectativasEntrevistado,
      acuerdosPrevios: formData.story.acuerdosPrevios.files,
      observaciones: formData.conclusion.observaciones,
      activacionRuta: formData.conclusion.activacionRuta,
      procesosConvivencia: formData.conclusion.procesosConvivencia,
      remision: formData.conclusion.remision.files,
      estadoCaso: formData.conclusion.estadoCaso,
      fechaProximoSeguimiento: formData.conclusion.fechaProximoSeguimiento,
      nombreOrientadora: formData.conclusion.nombreOrientadora,
      resumen: formData.resumen,
    };
  }

  static fromAPI(apiData: any): FormData {
    console.log(apiData);
    console.log(apiData.observaciones);
    return {
      general: {
        fecha: apiData.fecha,
        remitidoPor: apiData.remitidoPor,
        nombreRemitidoPor: apiData.nombreRemitidoPor,
        posiblesMotivosDeAtencion: apiData.posiblesMotivosDeAtencion,
        lineaDeAtencion: apiData.lineaDeAtencion,
        tipoDeAtencion: apiData.tipoDeAtencion,
      },
      story: {
        relatoEntrevistado: apiData.relatoEntrevistado,
        expectativasEntrevistado: apiData.expectativasEntrevistado,
        acuerdosPrevios: {
          files: [],
          preview: apiData.acuerdosPrevios || [],
        },
      },
      conclusion: {
        observaciones: apiData.observaciones,
        activacionRuta: apiData.activacionRuta,
        procesosConvivencia: apiData.procesosConvivencia,
        remision: {
          files: [],
          preview: apiData.remision || [],
        },
        estadoCaso: apiData.estadoCaso,
        fechaProximoSeguimiento: apiData.fechaProximoSeguimiento,
        nombreOrientadora: apiData.nombreOrientadora,
      },
      student: {
        id: apiData.estudiante,
        nombreCompleto: apiData.estudiante_snapshot?.nombreCompleto || "",
      },
      resumen: apiData.resumen || "",
    };
  }

  static updateField(field: string, value: any, data: FormData): FormData {
    const [section, subfield] = field.split(".");

    if (!section || !subfield) return data;

    return {
      ...data,
      [section]: {
        ...data[section],
        [subfield]: value,
      },
    };
  }
}
