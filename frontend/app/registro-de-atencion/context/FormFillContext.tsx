import { createContext, useContext, useState } from 'react';
import { useFormFill } from '../hooks/useFormFill';

const FormFillContext = createContext<ReturnType<typeof useFormFill> | undefined>(undefined);

export function FormFillProvider({ children }) {
  const formFillUtils = useFormFill();
  return (
    <FormFillContext.Provider value={formFillUtils}>
      {children}
    </FormFillContext.Provider>
  );
}

export function useFormFillContext() {
  const context = useContext(FormFillContext);
  if (context === undefined) {
    throw new Error('useFormFillContext must be used within a FormFillProvider');
  }
  return context;
}
