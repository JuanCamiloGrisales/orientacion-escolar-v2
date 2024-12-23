import { create } from 'zustand';
import { FormSection } from '@/app/student/create/types';
import { createFormSections, formSections } from '@/app/student/create/config/formSections';

interface FormSectionsStore {
  sections: FormSection[];
  initialized: boolean;
  initialize: () => Promise<void>;
}

export const useFormSectionsStore = create<FormSectionsStore>((set) => ({
  sections: formSections, // Usamos los formSections iniciales mientras se carga
  initialized: false,
  initialize: async () => {
    try {
      const sections = await createFormSections();
      set({ sections, initialized: true });
    } catch (error) {
      console.error('Error initializing form sections:', error);
      // En caso de error, mantener los formSections básicos
      set({ initialized: true });
    }
  },
}));
