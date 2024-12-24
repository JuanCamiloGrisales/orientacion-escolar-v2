"use client";

import { EditableStudentFields } from "@/components/pages/student/EditableStudentFields";
import { StudentFieldsOrganizer } from "@/components/pages/student/StudentFieldsOrganizer";
import { Button } from "@/components/ui/button";
import { StudentService } from "@/services/student/StudentService";
import { ArrowLeft, Download, Pencil, Printer } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useStudentId = () => {
  const pathname = usePathname();
  return pathname?.split("/")[2] || "";
};

export default function StudentFullInfoPage() {
  const [studentData, setStudentData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const studentId = useStudentId();

  const fetchData = async () => {
    if (!studentId) return;
    try {
      const data = await StudentService.getStudent(studentId);
      setStudentData(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [studentId]);

  if (!studentData) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="h-12 w-48 bg-gray-200 rounded-full" />
          <div className="h-8 w-32 bg-gray-200 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-auto bg-gradient-to-br from-indigo-50/50 via-white to-purple-50/30">
      <div className="w-full p-8">
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
                  Editar Información
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
              {studentData.nombreEstudiante}
            </h1>
            <p className="text-gray-500">
              {studentData.entidadPrestadoraDeSalud} · Grado{" "}
              {studentData.gradoEscolaridad}
            </p>
          </div>
        </header>

        {isEditing ? (
          <EditableStudentFields
            studentData={studentData}
            studentId={studentId}
            onCancel={() => setIsEditing(false)}
            onSave={() => {
              setIsEditing(false);
              fetchData();
            }}
          />
        ) : (
          <StudentFieldsOrganizer studentData={studentData} layout="full" />
        )}
      </div>
    </div>
  );
}
