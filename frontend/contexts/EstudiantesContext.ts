import { createContext } from "react";
import { EstudiantesContextType } from "../types/Estudiante";

export const EstudiantesContext = createContext<EstudiantesContextType>({
  estudiantes: [],
  loading: true,
  error: null,
  refetch: async () => {},
});
