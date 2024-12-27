"use client";

import { Card } from "@/components/ui/card";
import { FileText, Eye } from "lucide-react";
import type { FileAttachment } from "../types";
import { useState } from "react";
import { PDFViewer } from "@/components/PDFViewer";
import { AnimatePresence } from "framer-motion";

interface FileSectionProps {
  title: string;
  files: FileAttachment[];
}

export function FileSection({ title, files }: FileSectionProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (!files?.length) return null;

  return (
    <>
      <Card className="p-6 bg-white/50 backdrop-blur-sm border-purple-100">
        <h3 className="text-lg font-semibold text-purple-800 mb-4">{title}</h3>
        <div className="grid grid-cols-2 gap-4">
          {files.map((file) => {
            const fileName =
              file.nombre || file.archivo.split("/").pop() || "Archivo";
            return (
              <button
                key={file.id}
                onClick={() => setSelectedFile(file.archivo)}
                className="group p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-300 
                         hover:shadow-lg hover:shadow-purple-100/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl
                              group-hover:from-purple-200 group-hover:to-purple-300 transition-colors"
                  >
                    <FileText className="h-5 w-5 text-purple-700" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-700 truncate">
                      {fileName}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Eye className="h-4 w-4 text-purple-400" />
                      <span className="text-xs text-purple-600">
                        Ver documento
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <AnimatePresence>
        {selectedFile && (
          <PDFViewer url={selectedFile} onClose={() => setSelectedFile(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
