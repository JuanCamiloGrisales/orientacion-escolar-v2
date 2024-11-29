export type FormData = Record<string, Record<string, any>>;

export interface FormFillService {
  fillForm: (data: any) => FormData;
  validateData: (data: any) => boolean;
}

export interface FormFillContextType {
  fillFormWithData: (data: any) => void;
  isFillingForm: boolean;
}
