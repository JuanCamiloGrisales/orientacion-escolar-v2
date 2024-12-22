"use client";

import { StudentService } from "@/services/student/StudentService";
import { RegistroService } from "@/services/registro/RegistroService";
import { useState, useEffect } from "react";
import type { Registro, StudentInfo } from "../types";

export function useRegistroDetail(id: string) {
  const [registro, setRegistro] = useState<Registro | null>(null);
  const [currentStudent, setCurrentStudent] = useState<StudentInfo | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [studentLoading, setStudentLoading] = useState(false);

  useEffect(() => {
    const fetchRegistro = async () => {
      try {
        const data = await RegistroService.getRegistro(id);
        setRegistro(data);
        // Fetch current student info immediately after getting registro
        if (data?.estudiante) {
          setStudentLoading(true);
          try {
            const studentData = await StudentService.getStudent(
              data.estudiante.toString(),
            );
            setCurrentStudent(studentData);
          } catch (error) {
            console.error("Error fetching current student:", error);
          } finally {
            setStudentLoading(false);
          }
        }
      } catch (error) {
        console.error("Error fetching registro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRegistro();
  }, [id]);

  return {
    registro,
    currentStudent,
    loading,
    studentLoading,
  };
}
