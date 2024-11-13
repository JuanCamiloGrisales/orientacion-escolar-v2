export interface Registro {
  id: number;
  consecutivo: number;
  fecha: string;
  municipio: string;
  institucion: string;
  dane: string;
  sede: string;
  remitidoPor: string;
  nombreRemitidoPor: string;
  posiblesMotivosDeAtencion: string;
  lineaDeAtencion: string;
  tipoDeAtencion: string;
  entidadPrestadoraDeSalud: string;
  personaDeConfianza: string;
  nombreEstudiante: string;
  tipoDocumentoEstudiante: string;
  numeroDocumentoEstudiante: string;
  gradoEscolaridad: string;
  numeroTelefonoEstudiante: string;
  epsEstudiante: string;
  edadEstudiante: string;
  fechaNacimientoEstudiante: string;
  lugarNacimientoEstudiante: string;
  telefonoAcudiente: string;
  documentoAcudiente: string;
  direccion: string;
  parentescoAcudiente: string;
  sexo: string;
  genero: string;
  parentesco: string;
  nombre: string;
  edad: string;
  ocupacion: string;
  nivelEducativo: string;
  estadoCivil: string;
  numeroHijos: string;
  telefono: string;
  lugarResidencia: string;
  tipoFamilia: string;
  hogarYBienestar: string;
  espectativasEntrevistado: string;
  acuerdosPrevios: Archivo[];
  condicionDiscapacidad: string;
  tipoDiscapacidad: string;
  talentoYCapacidadesExepcionales: string;
  relatoEntrevistado: string;
  observaciones: string;
  activacionRuta: string;
  procesosConvivencia: string;
  remision: Archivo[];
  piar: Archivo[];
  estadoCaso: string;
  compromisoPadres: Archivo[];
  compromisoEstudiantes: Archivo[];
  fechaProximoSeguimiento: string;
  nombreOrientadora: string;
  created: string;
  resumen: string;
  slug: string;
  resumenRelato: string;
}

export interface Archivo {
  id: number;
  archivo: string;
}

export interface EstudiantesContextType {
  estudiantes: Registro[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
