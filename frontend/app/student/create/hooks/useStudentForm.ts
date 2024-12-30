import { useState, useEffect } from "react";
import { StudentFormData, FormFieldValue } from "../types";
import { StudentFormService } from "../services/StudentFormService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createFormSections } from "../config/formSections";

export function useStudentForm() {
  const [formData, setFormData] = useState<StudentFormData>(
    {} as StudentFormData,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const initializeFormWithDefaults = async () => {
      const sections = await createFormSections();
      const defaultValues = {} as StudentFormData;

      sections.forEach((section) => {
        section.fields.forEach((field) => {
          const fieldKey = field.name as keyof StudentFormData;
          if (field.defaultValue !== undefined && field.type !== "file") {
            (defaultValues[fieldKey] as string) = field.defaultValue;
          }
        });
      });

      setFormData((prev) => ({
        ...prev,
        ...defaultValues,
      }));
    };

    initializeFormWithDefaults();
  }, []);

  const handleFieldChange = (field: string, value: any) => {
    if (value instanceof File) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...(prev[field] || []), value],
      }));
    } else {
      const updatedData = StudentFormService.handleFieldUpdate(
        field,
        value,
        formData,
      );
      setFormData(updatedData);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      await StudentFormService.submitForm(formData);
      toast({
        title: "Éxito",
        description: "Estudiante creado correctamente",
      });
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Hubo un error al crear el estudiante",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    isSubmitting,
    handleFieldChange,
    handleSubmit,
  };
}
