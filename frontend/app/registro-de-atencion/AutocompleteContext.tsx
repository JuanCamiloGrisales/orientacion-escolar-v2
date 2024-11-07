// AutocompleteContext.tsx
import axios from 'axios';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

interface FieldOptions {
    default: string;
    opciones: string[];
}

interface AutocompleteData {
    municipio: FieldOptions;
    institucion: FieldOptions;
    dane: FieldOptions;
    sede: FieldOptions;
    remitidoPor: FieldOptions;
    nombreRemitidoPor: FieldOptions;
    posiblesMotivosDeAtencion: FieldOptions;
    lineaDeAtencion: FieldOptions;
    tipoDeAtencion: FieldOptions;
    entidadPrestadoraDeSalud: FieldOptions;
    nombreEstudiante: FieldOptions;
    tipoDocumentoEstudiante: FieldOptions;
    gradoEscolaridad: FieldOptions;
    sexo: FieldOptions;
    genero: FieldOptions;
    parentesco: FieldOptions;
    ocupacion: FieldOptions;
    nivelEducativo: FieldOptions;
    estadoCivil: FieldOptions;
    tipoFamilia: FieldOptions;
    condicionDiscapacidad: FieldOptions;
    tipoDiscapacidad: FieldOptions;
    talentoYCapacidadesExepcionales: FieldOptions;
    activacionRuta: FieldOptions;
    estadoCaso: FieldOptions;
    nombreOrientadora: FieldOptions;
}

const AutocompleteContext = createContext<AutocompleteData | null>(null);

export const useAutocomplete = () => {
    return useContext(AutocompleteContext);
};

export const AutocompleteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<AutocompleteData | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<AutocompleteData>('http://127.0.0.1:8000/api/editarcampos/');
                setData(response.data);
            } catch (error) {
            }
        };

        fetchData();
    }, []);

    const value = useMemo(() => {
        return data;
    }, [data]);

    return (
        <AutocompleteContext.Provider value={value}>
            {children}
        </AutocompleteContext.Provider>
    );
};