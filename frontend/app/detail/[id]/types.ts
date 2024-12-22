export interface StudentInfo {
  id: number;
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
  hogarYBienestar: string; // HTML content
  condicionDiscapacidad: string;
  tipoDiscapacidad: string;
  talentoYCapacidadesExepcionales: string; // HTML content
  piar: any[];
  compromisoPadres: any[];
  compromisoEstudiantes: any[];
}

export interface Registro {
  id: number;
  estudiante: number;
  consecutivo: number;
  fecha: string;
  remitidoPor: string;
  nombreRemitidoPor: string;
  posiblesMotivosDeAtencion: string;
  lineaDeAtencion: string;
  tipoDeAtencion: string;
  relatoEntrevistado: string;
  expectativasEntrevistado: string;
  acuerdosPrevios: any[];
  observaciones: string;
  activacionRuta: string;
  procesosConvivencia: string;
  remision: any[];
  estadoCaso: string;
  fechaProximoSeguimiento: string;
  nombreOrientadora: string;
  created: string;
  resumen: string;
  resumenRelato: string;
  estudiante_snapshot: StudentInfo;
}

export interface FileAttachment {
  id: number;
  archivo: string;
  nombre?: string;
  fecha?: string;
}

export type StudentFieldGroup =
  | "datosBasicos"
  | "contacto"
  | "academico"
  | "salud"
  | "acudiente"
  | "familiar";

export type StudentFieldConfig = {
  key: keyof StudentInfo;
  label: string;
  group: StudentFieldGroup;
};

export type GroupLabels = {
  [K in StudentFieldGroup]: string;
};
