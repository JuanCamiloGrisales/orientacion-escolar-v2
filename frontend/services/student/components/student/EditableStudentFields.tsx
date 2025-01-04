"use client";

import { FormFieldComponent } from "@/components/forms/fields/FormField";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useFormSectionsStore } from "@/services/form/stores/studentFormSectionsStore";
import { StudentService } from "@/services/student/StudentService";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const fileFieldNames = [
      "piar",
      "compromisoPadres",
      "compromisoEstudiantes",
    ];
    const newFormData = { ...initialData };

    fileFieldNames.forEach((fieldName) => {
      newFormData[fieldName] = {
        files: [],
        backendFiles: initialData[fieldName] || [],
        eliminated: [],
      };
    });

    setFormData(newFormData);
  }, [initialData]);

  const handleFieldChange = (fieldName: string, value: any) => {
    if (value instanceof FileList) {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: {
          ...prev[fieldName],
          files: [...prev[fieldName].files, ...Array.from(value)],
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [fieldName]: value,
      }));
    }
  };

  const handleRemoveBackendFile = (fieldName: string, fileId: number) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        eliminated: [...prev[fieldName].eliminated, fileId],
      },
    }));
  };

  useEffect(() => {
    console.log("Form Data:", formData);
  }, [formData]);

  const handleRemoveFrontendFile = (fieldName: string, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        files: prev[fieldName].files.filter((_, i) => i !== index),
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      setIsSaving(true);
      await StudentService.updateStudent(studentId, formData);
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
                    onRemoveBackendFile={
                      field.type === "file"
                        ? (fileId) =>
                            handleRemoveBackendFile(field.name, fileId)
                        : undefined
                    }
                    onRemoveFrontendFile={
                      field.type === "file"
                        ? (index) => handleRemoveFrontendFile(field.name, index)
                        : undefined
                    }
                    eliminatedFiles={
                      field.type === "file"
                        ? formData[field.name]?.eliminated
                        : []
                    }
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
