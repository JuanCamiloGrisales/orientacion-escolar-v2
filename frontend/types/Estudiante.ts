export interface Estudiante {
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
  parentescoAcudiente: string;
  municipio: string;
  institucion: string;
  dane: string;
  sede: string;
  entidadPrestadoraDeSalud: string;
  personaDeConfianza: string;
  telefonoAcudiente: string;
  documentoAcudiente: string;
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
  piar: Archivo[];
  compromisoPadres: Archivo[];
  compromisoEstudiantes: Archivo[];
  estadoCaso: string;
  fechaProximoSeguimiento: string;
  lineaDeAtencion: string;
}

export interface Archivo {
  id: number;
  archivo: string;
}

export interface EstudiantesContextType {
  estudiantes: Estudiante[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
