export type FormData = {
  student: {
    id: number;
    nombreCompleto: string;
  };
  general: {
    fecha: string;
    remitidoPor: string;
    nombreRemitidoPor: string;
    posiblesMotivosDeAtencion: string;
    lineaDeAtencion: string;
    tipoDeAtencion: string;
  };
  story: {
    relatoEntrevistado: string;
    expectativasEntrevistado: string;
    acuerdosPrevios: {
      files: File[];
      preview: string[];
    };
  };
  conclusion: {
    observaciones: string;
    activacionRuta: string;
    procesosConvivencia: string;
    remision: {
      files: File[];
      preview: string[];
    };
    estadoCaso: string;
    fechaProximoSeguimiento: string | null;
    nombreOrientadora: string;
  };
  resumen: string;
};

export interface FormSection {
  id: string;
  title: string;
  icon: any;
  fields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "select" | "date" | "tel" | "number" | "richtext" | "file";
  defaultValue?: string;
  options?: string[];
}
