"use client";
import { useToast } from "@/hooks/use-toast";
import { useRef, useState } from "react";
import { refreshAutocompleteData } from "../registro-de-atencion/context/AutocompleteContext";
import ApiKeyInput from "./components/ApiKeyInput";
import BackupManagement from "./components/BackupManagement";
import Header from "./components/Header";
import RestoreAlertDialog from "./components/RestoreAlertDialog";
import StudentsUpload from "./components/StudentsUpload";

export default function SettingsPage() {
  const { toast } = useToast();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [countdownValue, setCountdownValue] = useState(5);
  const [isUploading, setIsUploading] = useState(false);

  const studentsInputRef = useRef<HTMLInputElement>(null);
  const backupInputRef = useRef<HTMLInputElement>(null);

  const handleStudentsUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/upload/estudiantes/",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Falló la carga del archivo");

      toast({
        title: "¡Actualización exitosa!",
        description:
          "La lista de estudiantes ha sido actualizada correctamente.",
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
      if (event.target) event.target.value = "";
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
    formData.append("file", selectedFile);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/backup_restore/restore/",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Falló la restauración");

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
      if (backupInputRef.current) backupInputRef.current.value = "";
      refreshAutocompleteData();
    }
  };

  const handleDownloadBackup = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/backup_restore/backup/",
      );
      if (!response.ok) throw new Error("Falló la descarga");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `backup_${new Date().toISOString().split("T")[0]}.zip`;
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

  const handleApiKeySave = (apiKey: string) => {
    localStorage.setItem("geminiApiKey", apiKey);
    toast({
      title: "¡API Key guardada!",
      description: "Tu API Key de Gemini AI ha sido guardada correctamente.",
      variant: "default",
    });
  };

  return (
    <main className="flex-1 p-8 flex flex-col bg-gray-50/50">
      <Header />
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        <StudentsUpload
          studentsInputRef={studentsInputRef}
          isUploading={isUploading}
          handleStudentsUpload={handleStudentsUpload}
        />
        <BackupManagement
          backupInputRef={backupInputRef}
          handleBackupSelect={handleBackupSelect}
          handleDownloadBackup={handleDownloadBackup}
        />
        <ApiKeyInput handleApiKeySave={handleApiKeySave} />
      </div>
      <RestoreAlertDialog
        isAlertOpen={isAlertOpen}
        setIsAlertOpen={setIsAlertOpen}
        countdownValue={countdownValue}
        handleRestore={handleRestore}
      />
    </main>
  );
}
