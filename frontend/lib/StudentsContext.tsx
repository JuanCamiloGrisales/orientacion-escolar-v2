'use client';

// Re-export everything from their respective files
export { type Registro, type Archivo, type EstudiantesContextType } from '../types/registro';
export { EstudiantesContext } from '../contexts/EstudiantesContext';
export { EstudiantesProvider } from '../providers/EstudiantesProvider';
export { useEstudiantes } from '../hooks/useEstudiantes';