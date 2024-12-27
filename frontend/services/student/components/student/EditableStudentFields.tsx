"use client";

import { FormFieldComponent } from "@/components/forms/fields/FormField";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { StudentService } from "@/services/student/StudentService";
import { useFormSectionsStore } from "@/stores/formSectionsStore";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BackendFile, DisplayFile } from "@/types/file";

const mapBackendFilesToDisplayFiles = (
  fieldName: string,
  files: BackendFile[],
): DisplayFile[] => {
  return files.map((file) => ({
    name: `${fieldName}_${file.id}`,
    url: file.archivo,
    isBackendFile: true,
    id: file.id,
    type: file.archivo.toLowerCase().endsWith(".pdf")
      ? "application/pdf"
      : "application/octet-stream",
    size: 0,
  }));
};

interface EditableStudentFieldsProps {
  studentData: any;
  studentId: string;
  onCancel: () => void;
  onSave: () => void;
}

export const EditableStudentFields = ({
  studentData: initialData,
  studentId,
  onCancel,
  onSave,
}: EditableStudentFieldsProps) => {
  const { sections, initialize } = useFormSectionsStore();
  const [formData, setFormData] = useState(initialData);
  const [files, setFiles] = useState<{ [key: string]: (File | DisplayFile)[] }>(
    {},
  );
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Inicializar los archivos existentes
  useEffect(() => {
    const fileFields = ["piar", "compromisoPadres", "compromisoEstudiantes"];
    const initialFiles: { [key: string]: (File | DisplayFile)[] } = {};

    fileFields.forEach((fieldName) => {
      if (initialData[fieldName] && Array.isArray(initialData[fieldName])) {
        initialFiles[fieldName] = mapBackendFilesToDisplayFiles(
          fieldName,
          initialData[fieldName],
        );
      }
    });

    setFiles(initialFiles);
  }, [initialData]);

  const handleFieldChange = (fieldName: string, value: any) => {
    console.log("Field changed:", fieldName, value);

    if (
      value instanceof FileList ||
      (Array.isArray(value) &&
        (value[0] instanceof File || "isBackendFile" in value[0]))
    ) {
      // Para campos de archivo, actualiza el estado de files
      const fileArray = Array.from(value instanceof FileList ? value : value);
      setFiles((prev) => ({
        ...prev,
        [fieldName]: fileArray,
      }));

      // No actualizamos formData para archivos, ya que se manejan por separado
    } else {
      // Para campos normales
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await StudentService.updateStudent(studentId, formData, files);
      toast({
        title: "Información actualizada",
        description:
          "La información del estudiante se ha actualizado correctamente.",
      });
      onSave();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error al actualizar la información del estudiante.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!sections.length) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <div className="space-y-8">
      <div className="sticky top-0 z-10 flex justify-end gap-2 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-sm">
        <Button variant="outline" onClick={onCancel} disabled={isSaving}>
          <X className="w-4 h-4 mr-2" />
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((section) => (
          <div
            key={section.title}
            className="space-y-4 bg-white rounded-3xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-2">
              <div className="p-3 bg-indigo-50 rounded-2xl">
                <section.icon className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="font-semibold text-lg text-indigo-600">
                {section.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {section.fields.map((field) => (
                <div key={field.name} className="space-y-1">
                  <FormFieldComponent
                    field={field}
                    value={formData[field.name]}
                    onChange={(value) => handleFieldChange(field.name, value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
