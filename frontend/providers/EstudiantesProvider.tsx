import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EstudiantesContext } from "../contexts/EstudiantesContext";
import { Estudiante } from "../types/Estudiante";

export const EstudiantesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/estudiante-preview/",
      );
      setEstudiantes(response.data);
    } catch (e: any) {
      setError(e?.message || "Error al cargar los estudiantes");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = useMemo(
    () => ({
      estudiantes,
      loading,
      error,
      refetch: fetchData,
    }),
    [estudiantes, loading, error, fetchData],
  );

  return (
    <EstudiantesContext.Provider value={contextValue}>
      {children}
    </EstudiantesContext.Provider>
  );
};
