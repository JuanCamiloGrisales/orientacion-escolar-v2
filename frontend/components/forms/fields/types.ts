export interface FormSection {
  id: string | number;
  title: string;
  icon: any;
  fields: FormField[];
}

export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "select"
    | "date"
    | "datetime"
    | "tel"
    | "number"
    | "richtext"
    | "file";
  defaultValue?: string;
  options?: string[];
}

export interface BaseFieldProps {
  value: any;
  onChange: (value: any) => void;
  label: string;
}

export interface TextFieldProps extends BaseFieldProps {
  type?: string;
  defaultValue?: string;
}

export interface AutocompleteFieldProps extends TextFieldProps {
  options: string[];
}

export interface RichTextFieldProps extends BaseFieldProps {
  config?: any;
}

export interface FileFieldProps extends BaseFieldProps {
  accept?: string[];
  maxFiles?: number;
}
