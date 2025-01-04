import { useState, useEffect } from "react";
import { StudentService } from "../StudentService";
import { StudentPreview } from "../types";

interface UseStudentPreviewReturn {
  students: StudentPreview[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export const useStudentPreview = (): UseStudentPreviewReturn => {
  const [students, setStudents] = useState<StudentPreview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await StudentService.getStudentsPreview();
      setStudents(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return {
    students,
    isLoading,
    error,
    refetch: fetchStudents,
  };
};
