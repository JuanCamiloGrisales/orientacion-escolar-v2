import { FileText } from "lucide-react";
import { RegistroDetalle } from "@/services/registro/types";

interface MainInfoProps {
  data: RegistroDetalle;
}

export const MainInfo = ({ data }: MainInfoProps) => {
  const fields = [
    { label: "Resumen", value: data.resumen },
    { label: "Observaciones", value: data.observaciones },
    { label: "Relato del Entrevistado", value: data.relatoEntrevistado },
    { label: "Expectativas del Entrevistado", value: data.expectativasEntrevistado },
    { label: "Procesos de Convivencia", value: data.procesosConvivencia },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-3 bg-indigo-50 rounded-2xl">
          <FileText className="w-6 h-6 text-indigo-500" />
        </div>
        <h3 className="font-semibold text-lg text-indigo-600">
          Información Principal
        </h3>
      </div>

      <div className="space-y-6">
        {fields.map((field) => (
          <div key={field.label} className="space-y-2">
            <p className="font-medium text-sm text-gray-500">{field.label}</p>
            <div className="prose prose-sm max-w-none bg-gray-50/50 p-4 rounded-xl">
              <div dangerouslySetInnerHTML={{ __html: field.value || "No especificado" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
