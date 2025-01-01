export interface BackendFile {
  id: number;
  archivo: string;
  // ...otros campos del backend si existen...
}

export interface FileDisplay {
  name: string;
  url: string;
  isBackendFile: boolean;
  id: number;
  type: string;
  size: number;
}

export interface FileHandlingProps {
  mode?: "read" | "edit";
  onRemoveBackendFile?: (fileId: number) => void;
  onRemoveFrontendFile?: (index: number) => void;
  eliminatedFiles?: number[];
}

export interface FileFieldValue {
  files: File[];
  backendFiles: BackendFile[];
  eliminated: number[];
}
