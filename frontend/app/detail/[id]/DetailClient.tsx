"use client";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Edit } from "lucide-react";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { RegistroContent } from "./components/RegistroContent";
import { StudentInfoAccordion } from "./components/StudentInfoAccordion";
import { useRegistroDetail } from "./hooks/useRegistroDetail";

interface DetailClientProps {
  id: string;
}

export default function DetailClient({ id }: DetailClientProps) {
  const { registro, currentStudent, loading, studentLoading } =
    useRegistroDetail(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-20 px-4">
          <div className="grid grid-cols-[300px_1fr] gap-8">
            <div className="space-y-4">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
            <LoadingSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (!registro) {
    return <div>No se encontró el registro</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="py-20 px-8">
        <div className="flex justify-between items-center mb-8">
          <Button variant="ghost" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Button
            onClick={() => {
              const searchParams = new URLSearchParams({
                studentId: registro.estudiante.toString(),
                registroId: id,
              });
              window.location.href = `/registro-de-atencion?${searchParams.toString()}`;
            }}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar Registro
          </Button>
        </div>
        <div className="grid grid-cols-[500px_1fr] gap-12">
          <div className="sticky top-24 space-y-8 self-start">
            <StudentInfoAccordion
              student={registro?.estudiante_snapshot}
              title="Información del Estudiante"
              subtitle="Al momento del registro"
              variant="snapshot"
            />
            <StudentInfoAccordion
              student={currentStudent}
              title="Información Actual"
              loading={studentLoading}
              variant="current"
            />
          </div>
          <RegistroContent registro={registro!} />
        </div>
      </div>
    </div>
  );
}
