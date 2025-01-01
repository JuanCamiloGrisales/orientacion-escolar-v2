import { BackendFile } from "@/types/file";

export type FormFieldValue = string | File[];

export interface FileFieldValue {
  files: File[];
  backendFiles: BackendFile[];
  eliminated: number[];
}

export interface StudentFormData {
  nombreEstudiante: string;
  tipoDocumentoEstudiante: string;
  numeroDocumentoEstudiante: string;
  sexo: string;
  genero: string;
  gradoEscolaridad: string;
  numeroTelefonoEstudiante: string;
  epsEstudiante: string;
  edadEstudiante: string;
  fechaNacimientoEstudiante: string;
  lugarNacimientoEstudiante: string;
  direccion: string;
  municipio: string;
  institucion: string;
  dane: string;
  sede: string;
  entidadPrestadoraDeSalud: string;
  personaDeConfianza: string;
  telefonoAcudiente: string;
  documentoAcudiente: string;
  parentescoAcudiente: string;
  edadAcudiente: string;
  ocupacionAcudiente: string;
  nivelEducativo: string;
  estadoCivil: string;
  numeroHijos: string;
  lugarResidencia: string;
  tipoFamilia: string;
  hogarYBienestar: string;
  condicionDiscapacidad: string;
  tipoDiscapacidad: string;
  talentoYCapacidadesExepcionales: string;
  piar: FileFieldValue;
  compromisoPadres: FileFieldValue;
  compromisoEstudiantes: FileFieldValue;
}

export interface FormSection {
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
