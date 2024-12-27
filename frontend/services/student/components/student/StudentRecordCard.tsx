import { Card } from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { File, Pencil, Printer, Stars } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import type { RegistroSummary } from "@/services/registro/types";

interface StudentRecordCardProps {
  record: RegistroSummary;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
}

export function StudentRecordCard({ record, onEdit, onView }: StudentRecordCardProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card
          onClick={() => onView(record.id)}
          className="w-[300px] h-[300px] p-6 flex flex-col gap-4 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 cursor-pointer"
        >
          <div className="bg-indigo-50 rounded-xl p-3">
            <p className="text-sm text-indigo-600 font-medium text-center">
              {format(new Date(record.fecha), "dd 'de' MMMM 'de' yyyy", {
                locale: es,
              })}
            </p>
            <p className="text-xs text-indigo-400 text-center">
              {format(new Date(record.fecha), "HH:mm", { locale: es })}
            </p>
          </div>
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent hover:scrollbar-thumb-indigo-300">
            <p className="text-sm text-gray-600 leading-relaxed">
              {record.resumen}
            </p>
          </div>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={() => onEdit(record.id)}>
          <Pencil className="mr-2 h-4 w-4" />
          <span>Editar</span>
        </ContextMenuItem>
        <ContextMenuItem>
          <Printer className="mr-2 h-4 w-4" />
          <span>Imprimir</span>
        </ContextMenuItem>
        <ContextMenuItem className="text-purple-700 focus:bg-purple-500/30 focus:text-purple-800">
          <Stars className="mr-2 h-4 w-4" />
          <span>Ver Transcripción</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <div className="px-2 py-1 text-xs text-gray-500">Archivos</div>
        <ContextMenuItem>
          <File className="mr-2 h-4 w-4" />
          Archivo 1
        </ContextMenuItem>
        <ContextMenuItem>
          <File className="mr-2 h-4 w-4" />
          Archivo 2
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
