import { Download, Upload } from "lucide-react";
import { RefObject } from "react";

interface BackupManagementProps {
    backupInputRef: RefObject<HTMLInputElement>;
    handleBackupSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDownloadBackup: () => void;
}

export default function BackupManagement({
    backupInputRef,
    handleBackupSelect,
    handleDownloadBackup,
}: BackupManagementProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
                Gestión de Copias de Seguridad
            </h2>
            <div className="grid gap-4">
                <button
                    onClick={handleDownloadBackup}
                    className="border-2 border-indigo-100 rounded-xl p-6 cursor-pointer hover:bg-indigo-50 transition-all flex items-center gap-4"
                >
                    <Download className="h-8 w-8 text-indigo-400" />
                    <div>
                        <h3 className="font-medium text-gray-800 text-left">
                            Descargar copia de seguridad
                        </h3>
                        <p className="text-sm text-gray-500 text-left">
                            Guarda una copia de todos tus datos
                        </p>
                    </div>
                </button>

                <button
                    onClick={() => backupInputRef.current?.click()}
                    className="border-2 border-dashed border-indigo-200 rounded-xl p-6 cursor-pointer hover:border-indigo-400 transition-all flex items-center gap-4"
                >
                    <Upload className="h-8 w-8 text-indigo-400" />
                    <div>
                        <h3 className="font-medium text-gray-800 text-left">
                            Restaurar copia de seguridad
                        </h3>
                        <p className="text-sm text-gray-500 text-left">
                            Selecciona el archivo .zip
                        </p>
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
    );
}
