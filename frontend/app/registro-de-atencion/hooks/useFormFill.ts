import { useState } from "react";
import { FormData, FormFillService } from "./types";

export function useFormFill() {
  const [formData, setFormData] = useState<FormData | null>(null);

  const formFillService: FormFillService = {
    validateData: (data: any) => {
      // Aquí puedes implementar validaciones del JSON
      return true;
    },

    fillForm: (data: any): FormData => {
      // Transforma el JSON plano a la estructura del formulario
      return {
        general: {
          fechaAtencion: data.fecha,
          municipio: data.municipio,
          nombreEstablecimiento: data.institucion,
          // ... mapea el resto de campos
        },
        student: {
          nombreCompleto: data.nombreEstudiante,
          tipoDocumento: data.tipoDocumentoEstudiante,
          // ... mapea el resto de campos
        },
        // ... mapea el resto de secciones
      };
    },
  };

  const fillFormWithData = (data: any) => {
    if (formFillService.validateData(data)) {
      const transformedData = formFillService.fillForm(data);
      setFormData(transformedData);
    }
  };

  return { formData, fillFormWithData };
}
