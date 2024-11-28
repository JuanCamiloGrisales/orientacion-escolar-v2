import React, { createContext, useContext, useState } from "react";
import { FormFillContextType } from "./types";
import { useFormFill } from "./useFormFill";

const FormFillContext = createContext<FormFillContextType | undefined>(
  undefined,
);

export function FormFillProvider({ children }: { children: React.ReactNode }) {
  const [isFillingForm, setIsFillingForm] = useState(false);
  const { fillFormWithData: fillForm } = useFormFill();

  const fillFormWithData = (data: any) => {
    setIsFillingForm(true);
    fillForm(data);
    setIsFillingForm(false);
  };

  return (
    <FormFillContext.Provider value={{ fillFormWithData, isFillingForm }}>
      {children}
    </FormFillContext.Provider>
  );
}

export const useFormFillContext = () => {
  const context = useContext(FormFillContext);
  if (!context) {
    throw new Error("useFormFillContext must be used within FormFillProvider");
  }
  return context;
};
