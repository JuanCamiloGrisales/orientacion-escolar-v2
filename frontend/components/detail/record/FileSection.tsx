import { FilePreview } from "@/components/FilePreview";
import { ArchivoRegistro } from "@/services/registro/types";
import { Files } from "lucide-react";

interface FileSectionProps {
  acuerdosPrevios: ArchivoRegistro[];
  remision: ArchivoRegistro[];
}

export const FileSection = ({
  acuerdosPrevios,
  remision,
}: FileSectionProps) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-3 bg-indigo-50 rounded-2xl">
          <Files className="w-6 h-6 text-indigo-500" />
        </div>
        <h3 className="font-semibold text-lg text-indigo-600">
          Archivos Adjuntos
        </h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <p className="font-medium text-sm text-gray-500">Acuerdos Previos</p>
          <FilePreview mode="read" backendFiles={acuerdosPrevios} />
        </div>

        <div className="space-y-2">
          <p className="font-medium text-sm text-gray-500">Remisión</p>
          <FilePreview mode="read" backendFiles={remision} />
        </div>
      </div>
    </div>
  );
};
