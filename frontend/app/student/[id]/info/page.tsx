"use client";

import { Header } from "@/components/detail/Header";
import { EditableStudentFields } from "@/services/student/components/student/EditableStudentFields";
import { FieldsOrganizer } from "@/components/detail/FieldsOrganizer";
import { StudentService } from "@/services/student/StudentService";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useStudentId = () => {
  const pathname = usePathname();
  return pathname?.split("/")[2] || "";
};

export default function StudentFullInfoPage() {
  const [studentData, setStudentData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
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
        <Header
          mode="student"
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          data={studentData}
        />

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
          <FieldsOrganizer mode="student" data={studentData} layout="full" />
        )}
      </div>
    </div>
  );
}
