import { Upload } from "lucide-react";
import { RefObject } from "react";

interface StudentsUploadProps {
  studentsInputRef: RefObject<HTMLInputElement>;
  isUploading: boolean;
  handleStudentsUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function StudentsUpload({
  studentsInputRef,
  isUploading,
  handleStudentsUpload,
}: StudentsUploadProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Actualizar lista de alumnos
      </h2>
      <button
        onClick={() => studentsInputRef.current?.click()}
        className="w-full border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
        disabled={isUploading}
      >
        <Upload className="mx-auto h-12 w-12 text-indigo-400 mb-4" />
        <p className="text-gray-600">
          {isUploading
            ? "Subiendo archivo..."
            : "Haz clic para seleccionar el archivo SIMAT (.xlsx)"}
        </p>
        <input
          ref={studentsInputRef}
          type="file"
          accept=".xlsx"
          onChange={handleStudentsUpload}
          className="hidden"
        />
      </button>
    </div>
  );
}
