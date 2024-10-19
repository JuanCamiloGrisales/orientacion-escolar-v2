// lib/StudentContext.tsx
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Interfaces
export interface Registro {
    id: number;
    consecutivo: number;
    fecha: string | null;
    municipio: string;
    institucion: string;
    dane: string;
    sede: string;
    remitidoPor: string;
    nombreRemitidoPor: string;
    posiblesMotivosDeAtencion: string;
    lineaDeAtencion: string;
    tipoDeAtencion: string;
    entidadPrestadoraDeSalud: string;
    personaDeConfianza: string;
    nombreEstudiante: string;
    tipoDocumentoEstudiante: string;
    numeroDocumentoEstudiante: string;
    gradoEscolaridad: string;
    numeroTelefonoEstudiante: string;
    epsEstudiante: string;
    edadEstudiante: string;
    fechaNacimientoEstudiante: string;
    lugarNacimientoEstudiante: string;
    telefonoAcudiente: string;
    documentoAcudiente: string;
    direccion: string;
    parentescoAcudiente: string;
    sexo: string;
    genero: string;
    parentesco: string;
    nombre: string;
    edad: string;
    ocupacion: string;
    nivelEducativo: string;
    estadoCivil: string;
    numeroHijos: string;
    telefono: string;
    lugarResidencia: string;
    tipoFamilia: string;
    hogarYBienestar: string;
    espectativasEntrevistado: string;
    acuerdosPrevios: number[];
    condicionDiscapacidad: string;
    tipoDiscapacidad: string;
    talentoYCapacidadesExepcionales: string;
    relatoEntrevistado: string;
    observaciones: string;
    activacionRuta: string;
    procesosConvivencia: string;
    remision: number[];
    piar: number[];
    estadoCaso: string;
    compromisoPadres: number[];
    compromisoEstudiantes: number[];
    fechaProximoSeguimiento: string | null;
    nombreOrientadora: string;
    created: string;
    form_data: any;
    resumen: string;
    slug: string;
    resumenRelato: string;
}

interface Archivo {
    id: number;
    archivo: string;
}

// Contexto y Provider para Registros
interface RegistrosContextType {
    registros: Registro[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>; // Función para recargar datos
}

const RegistrosContext = createContext<RegistrosContextType>({
    registros: [],
    loading: true,
    error: null,
    refetch: async () => { }, // Función vacía por defecto
});

export const RegistrosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [registros, setRegistros] = useState<Registro[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true); // Inicia la carga
        setError(null);    // Limpia cualquier error anterior
        try {
            const response = await axios.get('http://localhost:8000/api/registros/');
            setRegistros(response.data);
        } catch (e: any) {
            setError(e?.message || "Error al cargar los registros");
        } finally {
            setLoading(false); // Finaliza la carga, incluso si hay error
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <RegistrosContext.Provider value={{ registros, loading, error, refetch: fetchData }}>
            {children}
        </RegistrosContext.Provider>
    );
};


// Hook personalizado
export const useRegistros = () => {
    return useContext(RegistrosContext);
};