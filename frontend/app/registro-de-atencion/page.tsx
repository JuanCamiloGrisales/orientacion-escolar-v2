"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { StudentService } from "@/services/student/StudentService";
import { useRegistroForm } from "./hooks/useRegistroForm";
import { FormSection } from "./components/FormSections";
import { createFormSections } from "./config/FormSections";
import { Header } from "./components/Header";
import { LoadingModal } from "./components/LoadingModal";

export default function RegistroAtencionPage() {
  const [sections, setSections] = useState([]);
  const [studentData, setStudentData] = useState<{
    id: string;
    nombreEstudiante: string;
  } | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { formData, isSubmitting, handleFieldChange, handleSubmit, stages } =
    useRegistroForm(studentData, searchParams.get("registroId") || undefined);

  useEffect(() => {
    const fetchData = async () => {
      const studentId = searchParams.get("studentId");
      if (!studentId) {
        router.push("/");
        return;
      }

      try {
        const student = await StudentService.getStudentPreview(studentId);
        setStudentData({
          id: student.id,
          nombreEstudiante: student.nombreEstudiante,
        });
      } catch (error) {
        console.error("Error fetching student:", error);
        router.push("/");
      }
    };

    fetchData();
  }, [searchParams, router]);

  useEffect(() => {
    const initializeSections = async () => {
      const loadedSections = await createFormSections();
      setSections(loadedSections);
    };
    initializeSections();
  }, []);

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100/50">
        <div className="max-w-5xl mx-auto p-8">
          <Header
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            studentName={studentData?.nombreEstudiante}
          />
          <div className="space-y-8">
            {sections.map((section, index) => (
              <FormSection
                key={index}
                section={section}
                data={formData}
                onChange={handleFieldChange}
              />
            ))}
          </div>
        </div>
      </div>
      {isSubmitting && <LoadingModal stages={stages} />}
    </main>
  );
}
