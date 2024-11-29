import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { AlertTriangle } from "lucide-react";

interface RestoreAlertDialogProps {
    isAlertOpen: boolean;
    setIsAlertOpen: (isOpen: boolean) => void;
    countdownValue: number;
    handleRestore: () => void;
}

export default function RestoreAlertDialog({
    isAlertOpen,
    setIsAlertOpen,
    countdownValue,
    handleRestore,
}: RestoreAlertDialogProps) {
    return (
        <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        Advertencia: Restauración de Base de Datos
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción eliminará todos los datos actuales y los reemplazará con
                        los del archivo de respaldo. Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={countdownValue > 0}
                        onClick={handleRestore}
                        className="bg-red-500 hover:bg-red-600"
                    >
                        {countdownValue > 0 ? `Continuar (${countdownValue})` : "Continuar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
