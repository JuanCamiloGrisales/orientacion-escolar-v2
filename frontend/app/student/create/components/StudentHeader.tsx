import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

interface StudentHeaderProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const StudentHeader = ({
  onSubmit,
  isSubmitting,
}: StudentHeaderProps) => {
  return (
    <div
      className="sticky top-0 z-10 bg-gradient-to-br from-gray-50 to-gray-100/50 
                    backdrop-blur-sm pb-4 mb-8"
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="p-2 rounded-lg hover:bg-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Nuevo Estudiante</h1>
        </div>
        <Button
          className="bg-gradient-to-r from-indigo-500 to-purple-500 
                     hover:from-indigo-600 hover:to-purple-600"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin mr-2">⭮</div> Guardando...
            </div>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar Registro
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
