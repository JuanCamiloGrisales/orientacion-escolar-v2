import { ClipboardEdit } from "lucide-react";
import { RegistroDetalle } from "@/services/registro/types";

interface GeneralInfoProps {
  data: RegistroDetalle;
}

export const GeneralInfo = ({ data }: GeneralInfoProps) => {
  const fields = [
    {
      label: "Fecha",
      value: new Date(data.fecha).toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    },
    { label: "Remitido Por", value: data.remitidoPor },
    { label: "Nombre del Remitente", value: data.nombreRemitidoPor },
    { label: "Posibles Motivos", value: data.posiblesMotivosDeAtencion },
    { label: "Línea de Atención", value: data.lineaDeAtencion },
    { label: "Tipo de Atención", value: data.tipoDeAtencion },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-3 bg-indigo-50 rounded-2xl">
          <ClipboardEdit className="w-6 h-6 text-indigo-500" />
        </div>
        <h3 className="font-semibold text-lg text-indigo-600">
          Información General
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.label} className="space-y-1">
            <p className="font-medium text-sm text-gray-500">{field.label}</p>
            <div className="text-base bg-gray-50/50 p-3 rounded-xl text-gray-700">
              {field.value || "No especificado"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
