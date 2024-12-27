import { StudentService } from "@/services/student/StudentService";
import { AutocompleteService } from "@/services/form/AutocompleteService";
import { dateService } from "@/utils/services/DateService";
import { StudentFormData } from "../types";
import { StudentDataAdapter } from "../adapters/StudentDataAdapter";

export class StudentFormService {
  static handleFieldUpdate(
    field: string,
    value: any,
    currentData: StudentFormData,
  ): StudentFormData {
    const newData = { ...currentData, [field]: value };

    if (field === "nombreEstudiante") {
      return this.handleStudentNameChange(value, newData);
    }

    if (field === "fechaNacimientoEstudiante" && value) {
      return this.handleBirthDateChange(value, newData);
    }

    return newData;
  }

  static async submitForm(
    formData: StudentFormData,
    files: { [key: string]: File[] },
  ): Promise<void> {
    const adaptedData = StudentDataAdapter.toAPI(formData);
    await StudentService.createStudent(adaptedData, files);
  }

  private static handleStudentNameChange(
    name: string,
    data: StudentFormData,
  ): StudentFormData {
    const studentInfo = AutocompleteService.getStudentByName(name);
    if (!studentInfo) return data;

    return StudentDataAdapter.fromExistingStudent(studentInfo, data);
  }

  private static handleBirthDateChange(
    date: string,
    data: StudentFormData,
  ): StudentFormData {
    return {
      ...data,
      edadEstudiante: dateService.calculateAge(date).toString(),
    };
  }
}
