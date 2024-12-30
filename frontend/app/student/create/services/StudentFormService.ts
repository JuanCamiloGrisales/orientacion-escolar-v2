import { StudentService } from "@/services/student/StudentService";
import { AutocompleteService } from "@/services/form/AutocompleteService";
import { dateService } from "@/utils/services/DateService";
import { StudentFormData, FormField, FormFieldValue } from "../types";
import { StudentDataAdapter } from "../adapters/StudentDataAdapter";
import { createFormSections } from "../config/formSections";

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

  static async submitForm(formData: StudentFormData): Promise<void> {
    const cleanedData = this.cleanFormData(formData);
    const validatedData = await this.validateFormData(cleanedData);
    const adaptedData = StudentDataAdapter.toAPI(validatedData);
    await StudentService.createStudent(adaptedData);
  }

  private static cleanFormData(data: StudentFormData): StudentFormData {
    const cleaned = {} as StudentFormData;

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        const fieldKey = key as keyof StudentFormData;
        if (this.isFileField(fieldKey)) {
          if (Array.isArray(value) && value.length > 0) {
            (cleaned[fieldKey] as File[]) = value as File[];
          }
        } else {
          (cleaned[fieldKey] as string) = value as string;
        }
      }
    });

    return cleaned;
  }

  private static async validateFormData(
    data: StudentFormData,
  ): Promise<StudentFormData> {
    const sections = await createFormSections();
    const defaultValues = {} as StudentFormData;

    sections.forEach((section) => {
      section.fields.forEach((field) => {
        const fieldKey = field.name as keyof StudentFormData;
        if (
          field.defaultValue !== undefined &&
          !this.isFileField(fieldKey) &&
          data[fieldKey] === undefined
        ) {
          (defaultValues[fieldKey] as string) = field.defaultValue;
        }
      });
    });

    return {
      ...defaultValues,
      ...data,
    };
  }

  // Helper para verificar si un campo es de tipo archivo
  private static isFileField(fieldName: keyof StudentFormData): boolean {
    return ["piar", "compromisoPadres", "compromisoEstudiantes"].includes(
      fieldName,
    );
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
