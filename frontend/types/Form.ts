// Interface representing the structure of field options
export interface FieldOptions {
  default: string;
  opciones: string[];
}

// Interface representing the structure of autocomplete data
export interface AutocompleteData {
  [key: string]: FieldOptions;
}

// Interface for student data
export interface StudentData {
  [key: string]: {
    tipoDocumento: string;
    numeroDocumento: number;
    eps: string;
    fechaNacimiento: string;
    lugarNacimiento: string;
    barrio: string;
    gradoEscolaridad: number;
  };
}

// Interface representing the structure of form field value
export interface FormFieldValue {
  value: string | File[] | null;
  files?: File[];
  preview?: string[];
}
