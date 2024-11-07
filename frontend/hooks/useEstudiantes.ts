import { useContext } from "react";
import { EstudiantesContext } from "../contexts/EstudiantesContext";

export const useEstudiantes = () => useContext(EstudiantesContext);
