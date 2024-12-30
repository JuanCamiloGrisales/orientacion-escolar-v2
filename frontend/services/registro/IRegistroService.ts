import { RegistroDetalle, RegistroSummary } from "./types";
import type { FormData as RegistroFormData } from "@/app/registro-de-atencion/types/form";

export interface Registro {
  id: number;
  fecha: string;
  resumen: string;
  nombre_estudiante: string;
}

export interface IRegistroService {
  getRegistrosByStudent(studentId: string): Promise<RegistroSummary[]>;
  getRegistro(id: string): Promise<RegistroDetalle>;
  createRegistro(
    data: RegistroFormData,
    files: { [key: string]: File[] },
  ): Promise<void>;
  updateRegistro(
    id: string,
    formData: RegistroFormData,
    summary: string,
  ): Promise<RegistroDetalle>;
  patchRegistro(
    id: string,
    formData: RegistroFormData,
    summary: string,
  ): Promise<RegistroDetalle>;
}
