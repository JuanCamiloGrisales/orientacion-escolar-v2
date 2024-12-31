"use client";

import { Header } from "@/components/detail/Header";
import { registroService } from "@/services/registro/RegistroService";
import { EditableStudentFields } from "@/services/student/components/student/EditableStudentFields";
import { FieldsOrganizer } from "@/components/detail/FieldsOrganizer";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const useRecordId = () => {
  const pathname = usePathname();
  return pathname?.split("/")[2] || "";
};

export default function StudentFullInfoPage() {
  const [recordData, setRecordData] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const recordId = useRecordId();

  const fetchData = async () => {
    if (!recordId) return;
    try {
      const data = await registroService.getRegistro(recordId);
      setRecordData(data);
    } catch (error) {
      console.error("Error fetching record data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [recordId]);

  if (!recordData) {
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
          mode="record"
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          data={recordData}
        />

        {isEditing ? (
          <EditableStudentFields
            studentData={recordData}
            studentId={recordId}
            onCancel={() => setIsEditing(false)}
            onSave={() => {
              setIsEditing(false);
              fetchData();
            }}
          />
        ) : (
          <FieldsOrganizer mode="record" data={recordData} layout="full" />
        )}
      </div>
    </div>
  );
}
