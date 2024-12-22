import type { StudentFieldConfig } from "./types";

export const STUDENT_FIELDS: StudentFieldConfig[] = [
  // Información Personal Básica
  { key: "nombreEstudiante", label: "Nombre completo", group: "datosBasicos" },
  {
    key: "tipoDocumentoEstudiante",
    label: "Tipo de documento",
    group: "datosBasicos",
  },
  {
    key: "numeroDocumentoEstudiante",
    label: "Número de documento",
    group: "datosBasicos",
  },
  { key: "edadEstudiante", label: "Edad", group: "datosBasicos" },
  {
    key: "fechaNacimientoEstudiante",
    label: "Fecha de nacimiento",
    group: "datosBasicos",
  },
  {
    key: "lugarNacimientoEstudiante",
    label: "Lugar de nacimiento",
    group: "datosBasicos",
  },

  // Información de Contacto y Ubicación
  { key: "direccion", label: "Dirección", group: "contacto" },
  { key: "numeroTelefonoEstudiante", label: "Teléfono", group: "contacto" },
  { key: "municipio", label: "Municipio", group: "contacto" },

  // Información Académica
  { key: "gradoEscolaridad", label: "Grado escolar", group: "academico" },
  { key: "institucion", label: "Institución", group: "academico" },
  { key: "sede", label: "Sede", group: "academico" },

  // Información de Salud
  { key: "sexo", label: "Sexo", group: "salud" },
  { key: "genero", label: "Género", group: "salud" },
  { key: "epsEstudiante", label: "EPS", group: "salud" },
  {
    key: "entidadPrestadoraDeSalud",
    label: "Entidad de salud",
    group: "salud",
  },
  {
    key: "condicionDiscapacidad",
    label: "Condición de discapacidad",
    group: "salud",
  },
  { key: "tipoDiscapacidad", label: "Tipo de discapacidad", group: "salud" },
  {
    key: "talentoYCapacidadesExepcionales",
    label: "Talentos y capacidades",
    group: "salud",
  },

  // Información del Acudiente
  {
    key: "parentescoAcudiente",
    label: "Parentesco del acudiente",
    group: "acudiente",
  },
  {
    key: "telefonoAcudiente",
    label: "Teléfono del acudiente",
    group: "acudiente",
  },
  {
    key: "documentoAcudiente",
    label: "Documento del acudiente",
    group: "acudiente",
  },
  { key: "edadAcudiente", label: "Edad del acudiente", group: "acudiente" },
  {
    key: "ocupacionAcudiente",
    label: "Ocupación del acudiente",
    group: "acudiente",
  },
  {
    key: "nivelEducativo",
    label: "Nivel educativo del acudiente",
    group: "acudiente",
  },

  // Información Familiar
  { key: "estadoCivil", label: "Estado civil padres", group: "familiar" },
  { key: "numeroHijos", label: "Número de hijos", group: "familiar" },
  { key: "lugarResidencia", label: "Lugar de residencia", group: "familiar" },
  { key: "tipoFamilia", label: "Tipo de familia", group: "familiar" },
  { key: "hogarYBienestar", label: "Situación del hogar", group: "familiar" },
];

export const GROUP_LABELS = {
  datosBasicos: "Datos Básicos",
  contacto: "Contacto y Ubicación",
  academico: "Información Académica",
  salud: "Salud y Condiciones Especiales",
  acudiente: "Información del Acudiente",
  familiar: "Situación Familiar",
};
