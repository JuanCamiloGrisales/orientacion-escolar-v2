import { StudentFormData } from "@/app/student/create/types";
import { API_ROUTES, createApiUrl } from "@/config/api";
import axios from "axios";
import { StudentPreview } from "./types";

export class StudentService {
  public static async createStudent(formData: StudentFormData): Promise<any> {
    try {
      const form = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            // Handle file arrays
            value.forEach((file) => {
              form.append(key, file);
            });
          } else {
            form.append(key, value.toString());
          }
        }
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
  ): Promise<any> {
    try {
      const form = new FormData();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          // Handle file fields
          if (
            value &&
            typeof value === "object" &&
            ("files" in value || "eliminated" in value)
          ) {
            // Create the structure for file fields
            const fileFieldData: any = {};

            // Add eliminated array if it exists
            if (value.eliminated && value.eliminated.length > 0) {
              fileFieldData.eliminated = value.eliminated;
            }

            // Append the JSON structure
            form.append(key, JSON.stringify(fileFieldData));

            // Append new files separately
            if (value.files) {
              value.files.forEach((file: File) => {
                form.append(key, file);
              });
            }
          } else {
            // Handle regular fields
            form.append(key, value.toString());
          }
        }
      });

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

  public static async getStudentsPreview(): Promise<StudentPreview[]> {
    const response = await axios.get(createApiUrl(API_ROUTES.STUDENTS.PREVIEW));
    return response.data;
  }

  public static async getStudentPreview(
    studentId: string,
  ): Promise<StudentPreview> {
    const response = await axios.get(
      createApiUrl(API_ROUTES.STUDENTS.PREVIEW_BY_ID, { id: studentId }),
    );
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
