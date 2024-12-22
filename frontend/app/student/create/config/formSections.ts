import {
  User,
  GraduationCap,
  Heart,
  Home,
  FileText,
  Users,
} from "lucide-react";
import { FormSection } from "../types";
import { AutocompleteService } from "@/services/form/AutocompleteService";

const createFormSections = async (): Promise<FormSection[]> => {
  // Fetch autocomplete data
  const autocompleteData = await AutocompleteService.fetchData();

  return [
    {
      title: "Información Personal",
      icon: User,
      fields: [
        {
          name: "nombreEstudiante",
          label: "Nombre Completo",
          type: "text",
          options: autocompleteData.nombreEstudiante?.opciones,
          defaultValue: autocompleteData.nombreEstudiante?.default,
        },
        {
          name: "tipoDocumentoEstudiante",
          label: "Tipo de Documento",
          type: "text",
          options: autocompleteData.tipoDocumentoEstudiante?.opciones,
          defaultValue: autocompleteData.tipoDocumentoEstudiante?.default,
        },
        {
          name: "numeroDocumentoEstudiante",
          label: "Número de Documento",
          type: "text",
        },
        {
          name: "sexo",
          label: "Sexo",
          type: "text",
          options: autocompleteData.sexo?.opciones,
          defaultValue: autocompleteData.sexo?.default,
        },
        {
          name: "genero",
          label: "Género",
          type: "text",
          options: autocompleteData.genero?.opciones,
          defaultValue: autocompleteData.genero?.default,
        },
        {
          name: "edadEstudiante",
          label: "Edad",
          type: "number",
        },
        {
          name: "fechaNacimientoEstudiante",
          label: "Fecha de Nacimiento",
          type: "date",
        },
        {
          name: "lugarNacimientoEstudiante",
          label: "Lugar de Nacimiento",
          type: "text",
        },
        {
          name: "numeroTelefonoEstudiante",
          label: "Teléfono",
          type: "tel",
        },
      ],
    },
    {
      title: "Información Académica",
      icon: GraduationCap,
      fields: [
        {
          name: "gradoEscolaridad",
          label: "Grado de Escolaridad",
          type: "text",
          options: autocompleteData.gradoEscolaridad?.opciones,
          defaultValue: autocompleteData.gradoEscolaridad?.default,
        },
        {
          name: "institucion",
          label: "Institución",
          type: "text",
          options: autocompleteData.institucion?.opciones,
          defaultValue: autocompleteData.institucion?.default,
        },
        {
          name: "dane",
          label: "Código DANE",
          type: "text",
          options: autocompleteData.dane?.opciones,
          defaultValue: autocompleteData.dane?.default,
        },
        {
          name: "sede",
          label: "Sede",
          type: "text",
          options: autocompleteData.sede?.opciones,
          defaultValue: autocompleteData.sede?.default,
        },
      ],
    },
    {
      title: "Información Residencial y de Salud",
      icon: Home,
      fields: [
        {
          name: "direccion",
          label: "Dirección",
          type: "text",
        },
        {
          name: "municipio",
          label: "Municipio",
          type: "text",
          options: autocompleteData.municipio?.opciones,
          defaultValue: autocompleteData.municipio?.default,
        },
        {
          name: "lugarResidencia",
          label: "Lugar de Residencia",
          type: "text",
        },
        {
          name: "entidadPrestadoraDeSalud",
          label: "EPS",
          type: "text",
          options: autocompleteData.entidadPrestadoraDeSalud?.opciones,
          defaultValue: autocompleteData.entidadPrestadoraDeSalud?.default,
        },
      ],
    },
    {
      title: "Información del Acudiente",
      icon: Users,
      fields: [
        {
          name: "personaDeConfianza",
          label: "Persona de Confianza",
          type: "text",
        },
        {
          name: "telefonoAcudiente",
          label: "Teléfono del Acudiente",
          type: "tel",
        },
        {
          name: "documentoAcudiente",
          label: "Documento del Acudiente",
          type: "text",
        },
        {
          name: "parentesco",
          label: "Parentesco",
          type: "text",
          options: autocompleteData.parentesco?.opciones,
          defaultValue: autocompleteData.parentesco?.default,
        },
        {
          name: "edadAcudiente",
          label: "Edad del Acudiente",
          type: "number",
        },
        {
          name: "ocupacion",
          label: "Ocupación",
          type: "text",
          options: autocompleteData.ocupacion?.opciones,
          defaultValue: autocompleteData.ocupacion?.default,
        },
        {
          name: "nivelEducativo",
          label: "Nivel Educativo",
          type: "text",
          options: autocompleteData.nivelEducativo?.opciones,
          defaultValue: autocompleteData.nivelEducativo?.default,
        },
        {
          name: "estadoCivil",
          label: "Estado Civil",
          type: "text",
          options: autocompleteData.estadoCivil?.opciones,
          defaultValue: autocompleteData.estadoCivil?.default,
        },
        {
          name: "numeroHijos",
          label: "Número de Hijos",
          type: "number",
        },
      ],
    },
    {
      title: "Información Familiar",
      icon: Heart,
      fields: [
        {
          name: "tipoFamilia",
          label: "Tipo de Familia",
          type: "text",
          options: autocompleteData.tipoFamilia?.opciones,
          defaultValue: autocompleteData.tipoFamilia?.default,
        },
        {
          name: "hogarYBienestar",
          label: "Hogar y Bienestar",
          type: "richtext",
        },
      ],
    },
    {
      title: "Condiciones Especiales",
      icon: Heart,
      fields: [
        {
          name: "condicionDiscapacidad",
          label: "¿Presenta Condición de Discapacidad?",
          type: "text",
          options: autocompleteData.condicionDiscapacidad?.opciones,
          defaultValue: autocompleteData.condicionDiscapacidad?.default,
        },
        {
          name: "tipoDiscapacidad",
          label: "Tipo de Discapacidad",
          type: "text",
          options: autocompleteData.tipoDiscapacidad?.opciones,
          defaultValue: autocompleteData.tipoDiscapacidad?.default,
        },
        {
          name: "talentoYCapacidadesExepcionales",
          label: "Talento y Capacidades Excepcionales",
          type: "richtext",
          options: autocompleteData.talentoYCapacidadesExepcionales?.opciones,
          defaultValue:
            autocompleteData.talentoYCapacidadesExepcionales?.default,
        },
      ],
    },
    {
      title: "Documentación",
      icon: FileText,
      fields: [
        {
          name: "piar",
          label: "PIAR",
          type: "file",
        },
        {
          name: "compromisoPadres",
          label: "Compromiso de Padres",
          type: "file",
        },
        {
          name: "compromisoEstudiantes",
          label: "Compromiso de Estudiantes",
          type: "file",
        },
      ],
    },
  ];
};

// Export both the async function and an initial empty state
export const formSections: FormSection[] = [
  {
    title: "Información Personal",
    icon: User,
    fields: [
      {
        name: "nombreEstudiante",
        label: "Nombre Completo",
        type: "text",
        options: [],
      },
    ],
  },
];

export { createFormSections };
