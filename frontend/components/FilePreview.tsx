import { FileService } from "@/services/files/FileService";
import { BackendFile, FileHandlingProps } from "@/types/file";
import { motion, AnimatePresence } from "framer-motion";
import { File, X } from "lucide-react";
import { useState } from "react";
import { PDFViewer } from "./PDFViewer";
import { Button } from "./ui/button";

interface FilePreviewProps extends FileHandlingProps {
  files?: File[];
  backendFiles?: BackendFile[];
}

const getFileNameFromUrl = (url: string): string => {
  try {
    return decodeURIComponent(url.split("/").pop() || "");
  } catch {
    return url.split("/").pop() || "";
  }
};

export const FilePreview = ({
  mode = "edit",
  files = [],
  backendFiles = [],
  onRemoveBackendFile,
  onRemoveFrontendFile,
  eliminatedFiles = [],
}: FilePreviewProps) => {
  const [selectedPDF, setSelectedPDF] = useState<string | null>(null);

  const handlePDFPreview = async (fileId: number) => {
    try {
      const blob = await FileService.downloadFile(fileId);
      const url = URL.createObjectURL(blob);
      setSelectedPDF(url);
    } catch (error) {
      console.error("Error loading PDF:", error);
    }
  };

  const isPDF = (fileName: string) => fileName.toLowerCase().endsWith(".pdf");

  const renderBackendFiles = () => {
    if (!backendFiles?.length) return null;

    return backendFiles
      .filter((file) => !eliminatedFiles.includes(file.id)) // Filter out eliminated files
      .map((file) => {
        const fileName = getFileNameFromUrl(file.archivo);
        return (
          <motion.div
            key={`backend-${file.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
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
            </div>

            <div className="flex gap-1">
              {isPDF(fileName) && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handlePDFPreview(file.id)}
                  className="opacity-0 group-hover:opacity-100"
                >
                  👁️
                </Button>
              )}

              {mode === "edit" && onRemoveBackendFile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemoveBackendFile(file.id)}
                  className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </motion.div>
        );
      });
  };

  const renderFrontendFiles = () => {
    if (!files?.length) return null;
    return files.map((file, index) => (
      <motion.div
        key={`frontend-${index}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
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
            {(file.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </div>

        {mode === "edit" && onRemoveFrontendFile && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveFrontendFile(index)}
            className="opacity-0 group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </motion.div>
    ));
  };

  return (
    <div className="grid grid-cols-1 gap-2 mt-4">
      <AnimatePresence>
        {selectedPDF && (
          <PDFViewer
            url={selectedPDF}
            onClose={() => {
              URL.revokeObjectURL(selectedPDF);
              setSelectedPDF(null);
            }}
          />
        )}
      </AnimatePresence>

      {renderBackendFiles()}
      {renderFrontendFiles()}
    </div>
  );
};
