import { create } from "zustand";
import { FormSection } from "@/components/forms/fields/types";
import { createFormSections } from "@/app/registro-de-atencion/config/FormSections";

interface FormSectionsStore {
  sections: FormSection[];
  initialized: boolean;
  initialize: () => Promise<void>;
}

export const useFormSectionsStore = create<FormSectionsStore>((set) => ({
  sections: [],
  initialized: false,
  initialize: async () => {
    try {
      const sections = await createFormSections();
      set({ sections, initialized: true });
    } catch (error) {
      console.error("Error initializing form sections:", error);
      set({ sections: [], initialized: true });
    }
  },
}));
