import { User } from "lucide-react";
import { FieldsOrganizer } from "@/components/detail/FieldsOrganizer";

interface StudentSnapshotProps {
  data: Record<string, any>;
}

export const StudentSnapshot = ({ data }: StudentSnapshotProps) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-3 bg-indigo-50 rounded-2xl">
          <User className="w-6 h-6 text-indigo-500" />
        </div>
        <h3 className="font-semibold text-lg text-indigo-600">
          Información del Estudiante
        </h3>
      </div>

      <div className="space-y-4">
        <FieldsOrganizer 
          mode="student" 
          data={data} 
          layout="compact" 
        />
      </div>
    </div>
  );
};
