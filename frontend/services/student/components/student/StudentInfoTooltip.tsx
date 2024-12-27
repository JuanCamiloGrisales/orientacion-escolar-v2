"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { StudentFieldsOrganizer } from "./StudentFieldsOrganizer";
import { useFormSectionsStore } from "@/stores/formSectionsStore";
import { useEffect } from "react";

export const StudentInfoTooltip = ({
  studentId,
  studentData,
}: {
  studentId: string;
  studentData: any;
}) => {
  const router = useRouter();
  const { sections, initialized, initialize } = useFormSectionsStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Mostramos el loading solo mientras no hay secciones
  if (!sections.length) {
    return <div className="h-8 w-8 rounded-full bg-gray-100 animate-pulse" />;
  }

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-white shadow-md hover:bg-gray-50"
        >
          <Info className="h-4 w-4 text-indigo-500" />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent
        align="start"
        className="w-[500px] p-6 bg-white/95 backdrop-blur-sm"
      >
        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
          <StudentFieldsOrganizer studentData={studentData} layout="compact" />
        </div>
        <Button
          variant="link"
          className="mt-4 text-indigo-600"
          onClick={() => router.push(`/student/${studentId}/info`)}
        >
          Ver información completa
        </Button>
      </HoverCardContent>
    </HoverCard>
  );
};
