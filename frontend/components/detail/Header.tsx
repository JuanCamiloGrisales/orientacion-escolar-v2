import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Pencil, Printer } from "lucide-react";
import { useRouter } from "next/navigation";

type Mode = "student" | "record";

interface StudentData {
  nombreEstudiante: string;
  entidadPrestadoraDeSalud: string;
  gradoEscolaridad: string;
}

interface RecordData {
  fecha: string;
  nombre_estudiante: string;
  consecutivo: number;
}

interface HeaderProps {
  mode: Mode;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  data: StudentData | RecordData;
}

export function Header({ mode, isEditing, setIsEditing, data }: HeaderProps) {
  const router = useRouter();

  const renderTitle = () => {
    if (mode === "student") {
      return (data as StudentData).nombreEstudiante;
    }
    const date = new Date((data as RecordData).fecha);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const renderSubtitle = () => {
    if (mode === "student") {
      const studentData = data as StudentData;
      return `${studentData.entidadPrestadoraDeSalud} · Grado ${studentData.gradoEscolaridad}`;
    }
    return `${(data as RecordData).nombre_estudiante} · Consecutivo #${(data as RecordData).consecutivo}`;
  };

  return (
    <header className="flex flex-col gap-8 mb-12">
      <div className="flex justify-between items-center">
        <Button
          variant="ghost"
          className="gap-2 hover:bg-white"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Button>
        <div className="flex gap-2">
          {!isEditing && (
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="w-4 h-4" />
              {mode === "student" ? "Editar Información" : "Editar Registro"}
            </Button>
          )}
          {!isEditing && (
            <>
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Exportar PDF
              </Button>
              <Button variant="outline" className="gap-2">
                <Printer className="w-4 h-4" />
                Imprimir
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {renderTitle()}
        </h1>
        <p className="text-gray-500">{renderSubtitle()}</p>
      </div>
    </header>
  );
}
