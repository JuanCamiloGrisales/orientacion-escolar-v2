
import { FilePreview } from "@/components/FilePreview";
import { motion } from "framer-motion";
import { Upload } from "lucide-react";
import { useState } from "react";
import type { FileFieldProps } from "./types";

export function FileField({ value, onChange, label }: FileFieldProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const droppedFiles = Array.from(e.dataTransfer.files);
        // Validar tipos de archivo permitidos
        const validFiles = droppedFiles.filter(file =>
            /\.(pdf|doc|docx|xls|xlsx|jpg|jpeg|png)$/i.test(file.name)
        );

        if (validFiles.length) {
            onChange(validFiles);
        }
    };

    return (
        <div>
            <motion.div
                whileHover={{ scale: 1.02 }}
                className={`border-3 border-dashed rounded-2xl p-6 text-center
                   transition-all duration-200 cursor-pointer
                   bg-gradient-to-br from-white to-indigo-50/30
                   ${isDragging ? 'border-indigo-400 bg-indigo-50/50' : 'border-indigo-100 hover:border-indigo-300'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className={`mx-auto w-12 h-12 mb-3 rounded-xl flex items-center justify-center
                       transition-colors ${isDragging ? 'bg-indigo-100' : 'bg-indigo-50'}`}>
                    <Upload className={`w-6 h-6 ${isDragging ? 'text-indigo-600' : 'text-indigo-400'}`} />
                </div>
                <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                    onChange={(e) => {
                        if (e.target.files) {
                            const files = Array.from(e.target.files);
                            onChange(files);
                        }
                    }}
                    className="hidden"
                    id={label}
                />
                <label htmlFor={label} className="cursor-pointer">
                    <p className="text-sm text-gray-600">
                        {isDragging ? "Suelta los archivos aquí" : (
                            <>
                                Arrastra archivos aquí o{" "}
                                <span className="text-indigo-500 font-medium">
                                    búscalos en tu dispositivo
                                </span>
                            </>
                        )}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        PDF, Word, Excel o imágenes
                    </p>
                </label>
            </motion.div>

            {Array.isArray(value) && value.length > 0 && (
                <FilePreview
                    files={value}
                    onRemove={(index) => {
                        const newFiles = [...value];
                        newFiles.splice(index, 1);
                        onChange(newFiles);
                    }}
                />
            )}
        </div>
    );
}