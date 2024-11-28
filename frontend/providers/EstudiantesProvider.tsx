import React, { useState, useCallback, useEffect, useMemo } from "react";
import axios from "axios";
import { Registro } from "../types/registro";
import { EstudiantesContext } from "../contexts/EstudiantesContext";

export const EstudiantesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [estudiantes, setEstudiantes] = useState<Registro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/registros/latest-per-alumno/",
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
