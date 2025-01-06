import { Button } from "@/components/ui/button";
import { CalendarDays, ClipboardList, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfirmationModal } from "./ConfirmationModal";

const toTitleCase = (str: string) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

interface HeaderProps {
  onSubmit: () => void;
  isSubmitting: boolean;
  studentName?: string;
}

export function Header({ onSubmit, isSubmitting, studentName }: HeaderProps) {
  const [showBackModal, setShowBackModal] = useState(false);
  const router = useRouter();
  const currentDate = new Date().toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleBack = () => {
    setShowBackModal(false);
    router.back();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm mb-8 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-6 w-6 text-indigo-500" />
            <h1 className="text-2xl font-bold text-gray-900">
              Registro de Atención
            </h1>
          </div>
          {studentName && (
            <div className="flex items-center gap-2 text-indigo-600 font-medium">
              <p className="text-sm">Estudiante: {toTitleCase(studentName)}</p>
            </div>
          )}
          <div className="flex items-center gap-2 text-gray-500">
            <CalendarDays className="h-4 w-4" />
            <p className="text-sm capitalize">{currentDate}</p>
          </div>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Button
            onClick={() => setShowBackModal(true)}
            variant="outline"
            className="flex items-center gap-2 flex-1 md:flex-none hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>

          <Button
            onClick={onSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
                     hover:from-indigo-600 hover:to-purple-600 flex-1 md:flex-none
                     transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">Guardando</span>
                <span className="animate-pulse ml-1">...</span>
              </>
            ) : (
              "Guardar Registro"
            )}
          </Button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showBackModal}
        onClose={() => setShowBackModal(false)}
        onConfirm={handleBack}
      />
    </div>
  );
}
