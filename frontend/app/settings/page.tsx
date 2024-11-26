"use client";
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
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle, Download, Upload } from 'lucide-react';
import { useRef, useState } from 'react';
import { refreshAutocompleteData } from "../registro-de-atencion/AutocompleteContext";

export default function SettingsPage() {
    const { toast } = useToast();
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [countdownValue, setCountdownValue] = useState(5);
    const [isUploading, setIsUploading] = useState(false);

    const studentsInputRef = useRef<HTMLInputElement>(null);
    const backupInputRef = useRef<HTMLInputElement>(null);

    const handleStudentsUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/upload/estudiantes/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Falló la carga del archivo');

            toast({
                title: "¡Actualización exitosa!",
                description: "La lista de estudiantes ha sido actualizada correctamente.",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al actualizar la lista de estudiantes.",
                variant: "destructive",
            });
        } finally {
            setIsUploading(false);
            if (event.target) event.target.value = '';
            refreshAutocompleteData();
        }
    };

    const handleBackupSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setIsAlertOpen(true);
        setCountdownValue(5);

        const timer = setInterval(() => {
            setCountdownValue((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleRestore = async () => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/backup_restore/restore/', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Falló la restauración');

            toast({
                title: "Restauración exitosa",
                description: "La base de datos ha sido restaurada correctamente.",
                variant: "default",
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Hubo un problema al restaurar la base de datos.",
                variant: "destructive",
            });
        } finally {
            setIsAlertOpen(false);
            setSelectedFile(null);
            if (backupInputRef.current) backupInputRef.current.value = '';
            refreshAutocompleteData();
        }
    };

    const handleDownloadBackup = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/backup_restore/backup/');
            if (!response.ok) throw new Error('Falló la descarga');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `backup_${new Date().toISOString().split('T')[0]}.zip`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast({
                title: "Error",
                description: "No se pudo descargar la copia de seguridad.",
                variant: "destructive",
            });
        }
    };

    return (
        <main className="flex-1 p-8 flex flex-col bg-gray-50/50">
            <header className="w-full mb-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-4 text-gray-800">Configuración</h1>
            </header>

            <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Actualizar lista de alumnos</h2>
                    <button
                        onClick={() => studentsInputRef.current?.click()}
                        className="w-full border-2 border-dashed border-indigo-200 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer"
                        disabled={isUploading}
                    >
                        <Upload className="mx-auto h-12 w-12 text-indigo-400 mb-4" />
                        <p className="text-gray-600">
                            {isUploading ? "Subiendo archivo..." : "Haz clic para seleccionar el archivo SIMAT (.xlsx)"}
                        </p>
                        <input
                            ref={studentsInputRef}
                            type="file"
                            accept=".xlsx"
                            onChange={handleStudentsUpload}
                            className="hidden"
                        />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Gestión de Copias de Seguridad</h2>
                    <div className="grid gap-4">
                        <button
                            onClick={handleDownloadBackup}
                            className="border-2 border-indigo-100 rounded-xl p-6 cursor-pointer hover:bg-indigo-50 transition-all flex items-center gap-4"
                        >
                            <Download className="h-8 w-8 text-indigo-400" />
                            <div>
                                <h3 className="font-medium text-gray-800 text-left">Descargar copia de seguridad</h3>
                                <p className="text-sm text-gray-500 text-left">Guarda una copia de todos tus datos</p>
                            </div>
                        </button>

                        <button
                            onClick={() => backupInputRef.current?.click()}
                            className="border-2 border-dashed border-indigo-200 rounded-xl p-6 cursor-pointer hover:border-indigo-400 transition-all flex items-center gap-4"
                        >
                            <Upload className="h-8 w-8 text-indigo-400" />
                            <div>
                                <h3 className="font-medium text-gray-800 text-left">Restaurar copia de seguridad</h3>
                                <p className="text-sm text-gray-500 text-left">Selecciona el archivo .zip</p>
                                <input
                                    ref={backupInputRef}
                                    type="file"
                                    accept=".zip"
                                    onChange={handleBackupSelect}
                                    className="hidden"
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-yellow-500" />
                            Advertencia: Restauración de Base de Datos
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Esta acción eliminará todos los datos actuales y los reemplazará con los del archivo de respaldo.
                            Esta acción no se puede deshacer.
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
        </main>
    );
}
