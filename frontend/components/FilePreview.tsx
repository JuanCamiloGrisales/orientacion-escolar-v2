"use client";

import { AnimatePresence, motion } from "framer-motion";
import { File, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { PDFViewer } from "./PDFViewer";
import { Button } from "./ui/button";

interface FilePreviewProps {
  files: File[];
  onRemove: (index: number) => void;
}

export const FilePreview = ({ files, onRemove }: FilePreviewProps) => {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);
  const pdfViewerRef = useRef<HTMLDivElement>(null);

  const handlePreview = (file: File) => {
    if (file.type === "application/pdf") {
      const url = URL.createObjectURL(file);
      setSelectedPDF(url);
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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPDF]);

  return (
    <>
      <AnimatePresence>
        {selectedPDF && (
          <div ref={pdfViewerRef}>
            <PDFViewer
              url={selectedPDF}
              onClose={() => {
                URL.revokeObjectURL(selectedPDF);
                setSelectedPDF(null);
              }}
            />
          </div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-2 mt-4">
        {files.map((file, index) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            key={index}
            className="relative group bg-white p-3 rounded-xl shadow-sm hover:shadow-md 
                     transition-all duration-200 flex items-center gap-3"
          >
            <div className="p-2 bg-indigo-50 rounded-lg">
              <File className="w-5 h-5 text-indigo-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-700 truncate">
                {file.name}
              </p>
              <p className="text-xs text-gray-400">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <div className="flex gap-1">
              {file.type === "application/pdf" && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handlePreview(file)}
                >
                  👁️
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity 
                         hover:bg-red-50 hover:text-red-500"
                onClick={() => onRemove(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};
