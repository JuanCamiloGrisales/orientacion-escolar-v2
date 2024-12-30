import type { FormData as RegistroFormData } from "@/app/registro-de-atencion/types/form";
import { API_ROUTES, createApiUrl } from "@/config/api";
import { IRegistroService } from "./IRegistroService";
import { RegistroDetalle, RegistroSummary } from "./types";
import axios from "axios";

export class RegistroService implements IRegistroService {
  public async getRegistrosByStudent(
    studentId: string,
  ): Promise<RegistroSummary[]> {
    try {
      const response = await axios.get(
        createApiUrl(API_ROUTES.REGISTROS.BY_STUDENT, { id: studentId }),
      );
      return response.data.sort(
        (a: RegistroSummary, b: RegistroSummary) =>
          new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
      );
    } catch (error) {
      throw error;
    }
  }

  public async getRegistro(id: string): Promise<RegistroDetalle> {
    const response = await axios.get(
      createApiUrl(API_ROUTES.REGISTROS.DETAIL, { id }),
    );
    return response.data;
  }

  public async createRegistro(
    data: RegistroFormData,
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

  public async updateRegistro(
    id: string,
    formData: RegistroFormData,
    summary: string,
  ): Promise<RegistroDetalle> {
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

  public async patchRegistro(
    id: string,
    formData: RegistroFormData,
    summary: string,
  ): Promise<RegistroDetalle> {
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

  private prepareFormData(
    formData: RegistroFormData,
    summary: string,
  ): FormData {
    const formDataObj = new FormData();
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

  private appendFiles(
    fieldName: string,
    fileData: { files: File[] },
    formData: FormData,
  ): void {
    if (fileData?.files?.length > 0) {
      fileData.files.forEach((file) => {
        formData.append(fieldName, file);
      });
    }
  }

  // Métodos estáticos para mantener compatibilidad con el código existente
  public static getInstance(): RegistroService {
    return new RegistroService();
  }
}

export const registroService: IRegistroService = new RegistroService();
