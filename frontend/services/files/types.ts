export interface FileMetadata {
  id?: number;
  name: string;
  size: number;
  type: string;
  url?: string;
  isBackendFile?: boolean;
}

export type SupportedFileTypes =
  | "pdf"
  | "doc"
  | "docx"
  | "xls"
  | "xlsx"
  | "jpg"
  | "jpeg"
  | "png";
