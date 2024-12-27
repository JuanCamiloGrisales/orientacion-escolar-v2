import { useState } from "react";
import { StudentFormData } from "../types";
import { StudentFormService } from "../services/StudentFormService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function useStudentForm() {
  const [formData, setFormData] = useState<StudentFormData>(
    {} as StudentFormData,
  );
  const [files, setFiles] = useState<{ [key: string]: File[] }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleFieldChange = (field: string, value: any) => {
    if (value instanceof File) {
      setFiles((prev) => ({
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
      await StudentFormService.submitForm(formData, files);
      toast({
        title: "Éxito",
        description: "Estudiante creado correctamente",
      });
      router.push("/students");
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
