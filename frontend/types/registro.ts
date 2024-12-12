import { Archivo, Estudiante } from "./Estudiante";

export interface Registro {
  id: number;
  estudiante: Estudiante;
  consecutivo: number;
  fecha: string;
  remitidoPor: string;
  nombreRemitidoPor: string;
  posiblesMotivosDeAtencion: string;
  lineaDeAtencion: string;
  tipoDeAtencion: string;
  relatoEntrevistado: string;
  espectativasEntrevistado: string;
  acuerdosPrevios: Archivo[];
  observaciones: string;
  activacionRuta: string;
  procesosConvivencia: string;
  remision: Archivo[];
  estadoCaso: string;
  fechaProximoSeguimiento: string;
  nombreOrientadora: string;
  created: string;
  resumen: string;
  slug: string;
  resumenRelato: string;
  estudiante_snapshot: any;
}
