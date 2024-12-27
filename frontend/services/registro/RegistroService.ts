import type { FormData as RegistroFormData } from "@/app/registro-de-atencion/types/form";
import { API_ROUTES, createApiUrl } from "@/config/api";
import axios from "axios";

export class RegistroService {
  static async createRegistro(
    data: any,
    files: { [key: string]: File[] },
  ): Promise<void> {
    const formData = new FormData();

    // Add regular data
    formData.append("data", JSON.stringify(data));

    // Add files
    Object.entries(files).forEach(([key, fileList]) => {
      fileList.forEach((file) => {
        formData.append(key, file);
      });
    });

    await axios.post(createApiUrl(API_ROUTES.REGISTROS.BASE), formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  static async updateRegistro(
    id: string,
    formData: RegistroFormData,
    summary: string,
  ): Promise<any> {
    const formDataObj = this.prepareFormData(formData, summary);
    const response = await axios.put(
      createApiUrl(API_ROUTES.REGISTROS.DETAIL, { id }),
      formDataObj,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  }

  static async patchRegistro(
    id: string,
    formData: RegistroFormData,
    summary: string,
  ): Promise<any> {
    const formDataObj = this.prepareFormData(formData, summary);
    const response = await axios.patch(
      createApiUrl(API_ROUTES.REGISTROS.DETAIL, { id }),
      formDataObj,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response.data;
  }

  static async getRegistro(id: string): Promise<any> {
    const response = await axios.get(
      createApiUrl(API_ROUTES.REGISTROS.DETAIL, { id }),
    );
    return response.data;
  }

  private static prepareFormData(
    formData: RegistroFormData,
    summary: string,
  ): globalThis.FormData {
    const formDataObj = new globalThis.FormData();
    const flattenedData = {
      estudiante: formData.student.id,
      fecha: formData.general.fecha,
      remitidoPor: formData.general.remitidoPor,
      nombreRemitidoPor: formData.general.nombreRemitidoPor,
      posiblesMotivosDeAtencion: formData.general.posiblesMotivosDeAtencion,
      lineaDeAtencion: formData.general.lineaDeAtencion,
      tipoDeAtencion: formData.general.tipoDeAtencion,
      relatoEntrevistado: formData.story.relatoEntrevistado,
      expectativasEntrevistado: formData.story.expectativasEntrevistado,
      observaciones: formData.conclusion.observaciones,
      activacionRuta: formData.conclusion.activacionRuta,
      procesosConvivencia: formData.conclusion.procesosConvivencia,
      estadoCaso: formData.conclusion.estadoCaso,
      fechaProximoSeguimiento: formData.conclusion.fechaProximoSeguimiento,
      nombreOrientadora: formData.conclusion.nombreOrientadora,
      resumen: summary,
    };

    formDataObj.append("json_data", JSON.stringify(flattenedData));

    this.appendFiles(
      "acuerdos_previos",
      formData.story.acuerdosPrevios,
      formDataObj,
    );
    this.appendFiles("remision", formData.conclusion.remision, formDataObj);

    return formDataObj;
  }

  private static appendFiles(
    fieldName: string,
    fileData: { files: File[] },
    formData: globalThis.FormData,
  ): void {
    if (fileData?.files?.length > 0) {
      fileData.files.forEach((file) => {
        formData.append(fieldName, file);
      });
    }
  }
}
