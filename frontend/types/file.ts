export interface BackendFile {
  id: number;
  archivo: string;
}

export interface CustomFile extends File {
  preview?: string;
  isBackendFile?: boolean;
  id?: number;
}

export interface DisplayFile {
  name: string;
  url: string;
  isBackendFile: boolean;
  id?: number;
  size?: number;
  type?: string;
  preview?: string;
}
