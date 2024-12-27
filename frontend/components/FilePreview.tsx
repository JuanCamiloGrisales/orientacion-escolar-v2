"use client";

import { FileService } from "@/services/files/FileService";
import { DisplayFile } from "@/types/file";
import { AnimatePresence, motion } from "framer-motion";
import { File, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PDFViewer } from "./PDFViewer";
import { Button } from "./ui/button";

interface FilePreviewProps {
  files: (File | DisplayFile)[];
  onRemove: (index: number) => void;
  readOnly?: boolean;
}

const getFileNameFromUrl = (url: string): string => {
  try {
    return decodeURIComponent(url.split("/").pop() || "");
  } catch {
    return url.split("/").pop() || "";
  }
};

export const FilePreview = ({
  files,
  onRemove,
  readOnly = false,
}: FilePreviewProps) => {
  const [selectedPDF, setSelectedPDF] = useState<string | Blob | null>(null);
  const [loading, setLoading] = useState(false);
  const pdfViewerRef = useRef<HTMLDivElement>(null);

  const handlePreview = async (file: File | DisplayFile) => {
    if ("isBackendFile" in file) {
      try {
        setLoading(true);
        const blob = await FileService.downloadFile(file.id!);
        setSelectedPDF(blob);
      } catch (error) {
        console.error("Error loading PDF:", error);
      } finally {
        setLoading(false);
      }
    } else {
      setSelectedPDF(URL.createObjectURL(file));
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      pdfViewerRef.current &&
      !pdfViewerRef.current.contains(event.target as Node)
    ) {
      URL.revokeObjectURL(selectedPDF!);
      setSelectedPDF(null);
    }
  };

  useEffect(() => {
    if (selectedPDF) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (selectedPDF instanceof Blob) {
        URL.revokeObjectURL(URL.createObjectURL(selectedPDF));
      }
    };
  }, [selectedPDF]);

  // Función de utilidad para verificar si es un archivo PDF
  const isPDFFile = (file: File | DisplayFile) => {
    if ("isBackendFile" in file) {
      return file.url?.toLowerCase()?.endsWith(".pdf") ?? false;
    }
    return file.name?.toLowerCase()?.endsWith(".pdf") ?? false;
  };

  // Función para obtener el nombre del archivo
  const getFileName = (file: File | DisplayFile) => {
    if ("isBackendFile" in file) {
      return getFileNameFromUrl(file.url);
    }
    return file.name || "Archivo sin nombre";
  };

  // Función para obtener el tamaño del archivo
  const getFileSize = (file: File | DisplayFile) => {
    if ("isBackendFile" in file) {
      return null; // El backend no proporciona tamaño
    }
    return (file.size / 1024 / 1024).toFixed(2);
  };

  return (
    <>
      <AnimatePresence>
        {selectedPDF && (
          <div ref={pdfViewerRef}>
            <PDFViewer
              url={selectedPDF}
              onClose={() => {
                if (selectedPDF instanceof Blob) {
                  URL.revokeObjectURL(URL.createObjectURL(selectedPDF));
                }
                setSelectedPDF(null);
              }}
            />
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {files.map((file, index) => {
          const fileName = getFileName(file);
          const fileSize = getFileSize(file);
          const isPDF = isPDFFile(file);
          const isBackendFile = "isBackendFile" in file;

          return (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              key={`${fileName}-${index}`}
              className="relative group bg-white p-3 rounded-xl shadow-sm hover:shadow-md 
                       transition-all duration-200 flex items-center gap-3"
            >
              <div className="p-2 bg-indigo-50 rounded-lg">
                <File className="w-5 h-5 text-indigo-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">
                  {fileName}
                </p>
                {fileSize && (
                  <p className="text-xs text-gray-400">{fileSize} MB</p>
                )}
              </div>
              <div className="flex gap-1">
                {isPDF && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handlePreview(file)}
                  >
                    👁️
                  </Button>
                )}
                {!readOnly && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity 
                             hover:bg-red-50 hover:text-red-500"
                    onClick={() => onRemove(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
};
