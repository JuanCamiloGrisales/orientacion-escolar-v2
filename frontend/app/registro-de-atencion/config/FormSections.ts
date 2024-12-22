import { FormSection } from "@/components/forms/fields/types";
import { AutocompleteService } from "@/services/form/AutocompleteService";
import { ClipboardEdit, FileText, ScrollText } from "lucide-react";
import { getCurrentColombiaDateTime } from "@/utils/date";

const createFormSections = async (): Promise<FormSection[]> => {
  const autocompleteData = await AutocompleteService.fetchData();

  return [
    {
      id: "general",
      title: "Información General",
      icon: ClipboardEdit,
      fields: [
        {
          name: "fecha",
          label: "Fecha",
          type: "datetime",
          defaultValue: getCurrentColombiaDateTime().toISOString(),
        },
        {
          name: "remitidoPor",
          label: "Remitido Por",
          type: "text",
          options: autocompleteData.remitidoPor?.opciones,
          defaultValue: autocompleteData.remitidoPor?.default,
        },
        {
          name: "nombreRemitidoPor",
          label: "Nombre del Remitente",
          type: "text",
          options: autocompleteData.nombreRemitidoPor?.opciones,
          defaultValue: autocompleteData.nombreRemitidoPor?.default,
        },
        {
          name: "posiblesMotivosDeAtencion",
          label: "Posibles Motivos",
          type: "text",
          options: autocompleteData.posiblesMotivosDeAtencion?.opciones,
          defaultValue: autocompleteData.posiblesMotivosDeAtencion?.default,
        },
        {
          name: "lineaDeAtencion",
          label: "Línea de Atención",
          type: "text",
          options: autocompleteData.lineaDeAtencion?.opciones,
          defaultValue: autocompleteData.lineaDeAtencion?.default,
        },
        {
          name: "tipoDeAtencion",
          label: "Tipo de Atención",
          type: "text",
          options: autocompleteData.tipoDeAtencion?.opciones,
          defaultValue: autocompleteData.tipoDeAtencion?.default,
        },
      ],
    },
    {
      id: "story",
      title: "Relato y Acuerdos",
      icon: ScrollText,
      fields: [
        {
          name: "relatoEntrevistado",
          label: "Relato del Entrevistado",
          type: "richtext",
        },
        {
          name: "expectativasEntrevistado",
          label: "Expectativas del Entrevistado",
          type: "richtext",
        },
        {
          name: "acuerdosPrevios",
          label: "Acuerdos Previos",
          type: "file",
        },
      ],
    },
    {
      id: "conclusion",
      title: "Conclusiones",
      icon: FileText,
      fields: [
        {
          name: "observaciones",
          label: "Observaciones",
          type: "richtext",
        },
        {
          name: "activacionRuta",
          label: "Activación de Ruta",
          type: "text",
          options: autocompleteData.activacionRuta?.opciones,
          defaultValue: autocompleteData.activacionRuta?.default,
        },
        {
          name: "procesosConvivencia",
          label: "Procesos de Convivencia",
          type: "richtext",
        },
        {
          name: "remision",
          label: "Remisión",
          type: "file",
        },
        {
          name: "estadoCaso",
          label: "Estado del Caso",
          type: "text",
          options: autocompleteData.estadoCaso?.opciones,
          defaultValue: autocompleteData.estadoCaso?.default,
        },
        {
          name: "fechaProximoSeguimiento",
          label: "Fecha Próximo Seguimiento",
          type: "datetime",
        },
        {
          name: "nombreOrientadora",
          label: "Nombre Orientadora",
          type: "text",
          options: autocompleteData.nombreOrientadora?.opciones,
          defaultValue: autocompleteData.nombreOrientadora?.default,
        },
      ],
    },
  ];
};

export { createFormSections };
