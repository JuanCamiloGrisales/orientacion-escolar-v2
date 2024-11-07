import { createContext } from "react";
import { EstudiantesContextType } from "../types/registro";

export const EstudiantesContext = createContext<EstudiantesContextType>({
  estudiantes: [],
  loading: true,
  error: null,
  refetch: async () => {},
});
