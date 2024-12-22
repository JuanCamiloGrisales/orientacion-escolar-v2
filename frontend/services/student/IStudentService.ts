import { StudentFormData } from "@/app/student/create/types";
import { StudentService } from "./StudentService";

export interface IStudentService {
  createStudent(
    formData: StudentFormData,
    files: { [key: string]: File[] },
  ): Promise<any>;
  getStudentPreview(studentId: string): Promise<any>;
  getAllStudents(): Promise<any>;
}

// Create a concrete implementation
export const studentService: IStudentService = StudentService;
