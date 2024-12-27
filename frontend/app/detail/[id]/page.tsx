import DetailClient from "./DetailClient";

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailPage({ params }: Props) {
  const { id } = await params;
  return <DetailClient id={id} />;
}

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { RegistroContent } from "./components/RegistroContent";
import { StudentInfoAccordion } from "./components/StudentInfoAccordion";
import { useRegistroDetail } from "./hooks/useRegistroDetail";

function DetailContent({ id }: { id: string }) {
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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto py-20 px-4">
        <div className="grid grid-cols-[300px_1fr] gap-8">
          {/* Left sidebar */}
          <div className="space-y-4">
            <StudentInfoAccordion
              student={registro.estudiante_snapshot}
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

          {/* Main content */}
          <RegistroContent registro={registro} />
        </div>
      </div>
    </div>
  );
}
