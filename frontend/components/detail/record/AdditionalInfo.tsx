import { ClipboardCheck } from "lucide-react";

interface AdditionalInfoProps {
  activacionRuta: string;
  estadoCaso: string;
  fechaProximoSeguimiento: string;
  nombreOrientadora: string;
}

export const AdditionalInfo = ({
  activacionRuta,
  estadoCaso,
  fechaProximoSeguimiento,
  nombreOrientadora,
}: AdditionalInfoProps) => {
  const fields = [
    { label: "Activación de Ruta", value: activacionRuta },
    { label: "Estado del Caso", value: estadoCaso },
    {
      label: "Próximo Seguimiento",
      value: fechaProximoSeguimiento
        ? new Date(fechaProximoSeguimiento).toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : null,
    },
    { label: "Orientadora", value: nombreOrientadora },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-3 bg-indigo-50 rounded-2xl">
          <ClipboardCheck className="w-6 h-6 text-indigo-500" />
        </div>
        <h3 className="font-semibold text-lg text-indigo-600">
          Estado y Seguimiento
        </h3>
      </div>

      <div className="space-y-4">
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
