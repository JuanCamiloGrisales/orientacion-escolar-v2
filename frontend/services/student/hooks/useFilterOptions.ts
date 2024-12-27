import { StudentPreview } from "../types";
import { useMemo } from "react";

export const useFilterOptions = (students: StudentPreview[]) => {
  const gradoEscolaridadOptions = useMemo(() => {
    return Array.from(
      new Set(students.map((student) => student.gradoEscolaridad)),
    ).sort();
  }, [students]);

  return {
    gradoEscolaridadOptions,
  };
};
