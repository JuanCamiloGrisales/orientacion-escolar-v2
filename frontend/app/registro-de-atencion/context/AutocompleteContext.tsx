// AutocompleteContext.tsx
import axios from "axios";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

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

// Add local storage helper functions
const CACHE_KEY = "autocompleteData";
const CACHE_TIMESTAMP_KEY = "autocompleteDataTimestamp";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const saveToCache = (data: AutocompleteData) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
};

const loadFromCache = (): AutocompleteData | null => {
  const timestamp = localStorage.getItem(CACHE_TIMESTAMP_KEY);
  if (!timestamp || Date.now() - parseInt(timestamp) > CACHE_DURATION) {
    return null;
  }
  const cached = localStorage.getItem(CACHE_KEY);
  return cached ? JSON.parse(cached) : null;
};

export const clearCache = () => {
  localStorage.removeItem(CACHE_KEY);
  localStorage.removeItem(CACHE_TIMESTAMP_KEY);
};

export const AutocompleteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<AutocompleteData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Try to load from cache first
      const cached = loadFromCache();
      if (cached) {
        setData(cached);
        return;
      }

      // If no cache, fetch from API
      try {
        const response = await axios.get<AutocompleteData>(
          "http://127.0.0.1:8000/api/editarcampos/",
        );
        setData(response.data);
        saveToCache(response.data);
      } catch (error) {
        console.error("Failed to fetch autocomplete data:", error);
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

// Add function to refresh cache
export const refreshAutocompleteData = async () => {
  try {
    const response = await axios.get<AutocompleteData>(
      "http://127.0.0.1:8000/api/editarcampos/",
    );
    saveToCache(response.data);
    return response.data;
  } catch (error) {
    console.error("Failed to refresh autocomplete data:", error);
    throw error;
  }
};
