import { RegistroService } from "@/services/registro/RegistroService";
import { RegistroDataAdapter } from "../adapters/RegistroDataAdapter";
import { FormData } from "../types/form";
import { generateSummary } from "../utils/aiService";

export class RegistroFormService {
  static async handleFieldUpdate(
    field: string,
    value: any,
    currentData: FormData,
  ): Promise<FormData> {
    const newData = { ...currentData };

    if (field === "relatoEntrevistado" && value) {
      const summary = await generateSummary(value);
      if (summary) {
        newData.conclusion = {
          ...newData.conclusion,
          observaciones: summary,
        };
      }
    }

    return RegistroDataAdapter.updateField(field, value, newData);
  }

  static async submitForm(
    formData: FormData,
    files: { [key: string]: File[] },
    registroId?: string,
  ): Promise<void> {
    const resumen = await generateSummary(formData.story.relatoEntrevistado);

    const adaptedData = RegistroDataAdapter.toAPI({
      ...formData,
      resumen,
    });

    const processedFiles = Object.entries(files).reduce(
      (acc, [key, fileList]) => {
        if (fileList && fileList.length > 0) {
          acc[key] = fileList;
        }
        return acc;
      },
      {} as { [key: string]: File[] },
    );

    if (registroId) {
      await RegistroService.patchRegistro(registroId, adaptedData, resumen);
    } else {
      await RegistroService.createRegistro(adaptedData, processedFiles);
    }
  }

  static async loadRegistro(id: string): Promise<FormData> {
    const registro = await RegistroService.getRegistro(id);
    return RegistroDataAdapter.fromAPI(registro);
  }
}
