import { StudentFormData } from "@/app/student/create/types";
import { API_ROUTES, createApiUrl } from "@/config/api";
import { StudentPreview } from "./types";
import axios from "axios";

export class StudentService {
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

      const response = await axios.post(
        createApiUrl(API_ROUTES.STUDENTS.BASE),
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async updateStudent(
    studentId: string,
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
      console.log("form", form);
      const response = await axios.put(
        createApiUrl(API_ROUTES.STUDENTS.DETAIL, { id: studentId }),
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  public static async getStudentPreview(): Promise<StudentPreview[]> {
    const response = await axios.get(createApiUrl(API_ROUTES.STUDENTS.PREVIEW));
    return response.data;
  }

  public static async getAllStudents(): Promise<any> {
    const response = await axios.get(createApiUrl(API_ROUTES.STUDENTS.LIST));
    return response.data;
  }

  public static async getStudent(studentId: string): Promise<any> {
    try {
      const response = await axios.get(
        createApiUrl(API_ROUTES.STUDENTS.DETAIL, { id: studentId }),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
