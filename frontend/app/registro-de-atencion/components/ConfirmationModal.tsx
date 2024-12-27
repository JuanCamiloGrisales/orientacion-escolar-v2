import { Button } from "@/components/ui/button";
import "../styles/globals.css";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 transform transition-all scale-in-center">
        <div className="text-center">
          {/* Animated icon */}
          <div className="mb-4">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg
                className="w-8 h-8 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            ¿Estás seguro?
          </h3>

          <p className="text-gray-600 mb-6">
            Si reinicias el formulario, perderás toda la información que has
            ingresado hasta el momento.
          </p>

          <div className="flex space-x-4 justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-6 py-2 rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              Cancelar
            </Button>
            <Button
              type="button"
              onClick={onConfirm}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 transition-all duration-200"
            >
              Sí, reiniciar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
