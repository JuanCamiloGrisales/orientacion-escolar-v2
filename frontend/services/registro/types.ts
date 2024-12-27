export interface ArchivoRegistro {
  id: number;
  archivo: string;
}

export interface RegistroSummary {
  id: number;
  fecha: string;
  resumen: string;
  nombre_estudiante: string;
}

export interface RegistroDetalle {
  id: number;
  acuerdosPrevios: ArchivoRegistro[];
  remision: ArchivoRegistro[];
  consecutivo: number;
  fecha: string;
  remitidoPor: string;
  nombreRemitidoPor: string;
  posiblesMotivosDeAtencion: string;
  lineaDeAtencion: string;
  tipoDeAtencion: string;
  relatoEntrevistado: string;
  expectativasEntrevistado: string;
  observaciones: string;
  activacionRuta: string;
  procesosConvivencia: string;
  estadoCaso: string;
  fechaProximoSeguimiento: string;
  nombreOrientadora: string;
  created: string;
  resumen: string;
  slug: string;
  resumenRelato: string;
  estudiante_snapshot: Record<string, any>;
  estudiante: number;
}
