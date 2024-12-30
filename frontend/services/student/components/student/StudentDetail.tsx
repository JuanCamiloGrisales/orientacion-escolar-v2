"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { registroService } from "@/services/registro/RegistroService";
import type { RegistroSummary } from "@/services/registro/types";
import { StudentService } from "@/services/student/StudentService";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NewRecordCard } from "./NewRecordCard";
import { StudentHeader } from "./StudentHeader";
import { StudentRecordCard } from "./StudentRecordCard";

export default function StudentDetail() {
  const [studentRecords, setStudentRecords] = useState<RegistroSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState<any>(null);
  const router = useRouter();
  const params = useParams();

  const studentId = params?.id?.toString() || "";

  useEffect(() => {
    const fetchData = async () => {
      if (!studentId) return;

      try {
        const [records, student] = await Promise.all([
          registroService.getRegistrosByStudent(studentId),
          StudentService.getStudent(studentId),
        ]);

        setStudentRecords(records);
        setStudentData(student);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Skeleton className="w-[300px] h-[300px] rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 flex flex-col bg-gray-50/50">
      <StudentHeader
        studentData={studentData}
        studentName={studentRecords[0]?.nombre_estudiante || ""}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <NewRecordCard studentId={studentId} />

        {studentRecords.map((record) => (
          <StudentRecordCard
            key={record.id}
            record={record}
            onEdit={(recordId) => {
              const searchParams = new URLSearchParams({
                studentId: studentId,
                registroId: recordId.toString(),
              });
              router.push(`/registro-de-atencion?${searchParams.toString()}`);
            }}
            onView={(recordId) => router.push(`/detail/${recordId}`)}
          />
        ))}
      </div>
    </div>
  );
}
