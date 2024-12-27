import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

interface NewRecordCardProps {
  studentId: string;
}

export function NewRecordCard({ studentId }: NewRecordCardProps) {
  const router = useRouter();

  return (
    <Card
      className="w-[300px] h-[300px] group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 cursor-pointer"
      onClick={() => router.push(`/registro-de-atencion?studentId=${studentId}`)}
    >
      <Button
        variant="ghost"
        size="lg"
        className="w-full h-full group-hover:scale-105 transition-transform duration-200"
      >
        <Plus className="w-12 h-12 text-indigo-400 group-hover:text-indigo-500" />
      </Button>
    </Card>
  );
}
