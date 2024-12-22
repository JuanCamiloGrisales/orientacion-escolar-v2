import { StudentFormData } from "@/app/student/create/types";
import axios from "axios";

export class StudentService {
  private static readonly BASE_URL = "http://127.0.0.1:8000/api";

  public static async createStudent(
    formData: StudentFormData,
    files: { [key: string]: File[] },
  ): Promise<any> {
    try {
      const form = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          form.append(key, value.toString());
        }
      });

      // Add all files
      Object.entries(files).forEach(([key, fileList]) => {
        fileList.forEach((file) => {
          form.append(key, file);
        });
      });

      const response = await axios.post(`${this.BASE_URL}/estudiantes/`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async getStudentPreview(studentId: string): Promise<any> {
    const response = await axios.get(
      `${this.BASE_URL}/estudiante-preview/${studentId}/`,
    );
    return response.data;
  }

  public static async getAllStudents(): Promise<any> {
    const response = await axios.get(`${this.BASE_URL}/lista-estudiantes/`);
    return response.data;
  }

  public static async getStudent(studentId: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.BASE_URL}/estudiantes/${studentId}/`,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
