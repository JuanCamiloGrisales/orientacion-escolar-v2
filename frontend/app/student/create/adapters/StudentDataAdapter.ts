import { dateService } from "@/utils/services/DateService";
import { StudentFormData } from "../types";

export class StudentDataAdapter {
  static toAPI(formData: StudentFormData): any {
    return {
      // Transform formData to API format
      ...formData,
      // Add any necessary transformations
    };
  }

  static fromExistingStudent(
    studentInfo: any,
    currentData: StudentFormData,
  ): StudentFormData {
    const birthDate = dateService.parseSpanishDateToISO(
      studentInfo.fechaNacimiento,
    );

    return {
      ...currentData,
      tipoDocumentoEstudiante: studentInfo.tipoDocumento,
      numeroDocumentoEstudiante: studentInfo.numeroDocumento.toString(),
      entidadPrestadoraDeSalud: studentInfo.eps,
      fechaNacimientoEstudiante: birthDate,
      edadEstudiante: dateService.calculateAge(birthDate).toString(),
      lugarNacimientoEstudiante: studentInfo.lugarNacimiento,
      lugarResidencia: studentInfo.barrio,
      gradoEscolaridad: studentInfo.gradoEscolaridad.toString(),
    };
  }
}
