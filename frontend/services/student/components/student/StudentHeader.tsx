import { StudentInfoTooltip } from "./StudentInfoTooltip";

interface StudentHeaderProps {
  studentData: any;
  studentName: string;
}

export function StudentHeader({ studentData, studentName }: StudentHeaderProps) {
  return (
    <header className="w-full mb-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-800">
          Historial del Estudiante
        </h1>
        {studentData && (
          <StudentInfoTooltip
            studentId={studentData.id.toString()}
            studentData={studentData}
          />
        )}
      </div>
      <p className="text-gray-600">{studentName}</p>
    </header>
  );
}
