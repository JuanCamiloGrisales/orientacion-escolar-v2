import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

interface FormSubmitButtonProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

export const FormSubmitButton = ({
  onSubmit,
  isSubmitting,
}: FormSubmitButtonProps) => {
  return (
    <div className="sticky bottom-0 z-10 py-4 bg-gradient-to-t from-gray-50 to-transparent">
      <div className="flex justify-end">
        <Button
          className="px-8 py-6 bg-gradient-to-r from-indigo-500 to-purple-500 
                    hover:from-indigo-600 hover:to-purple-600 rounded-xl text-lg
                    transform hover:scale-105 transition-all duration-200"
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin mr-2">⭮</div> Guardando...
            </div>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Guardar Perfil
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
