"use client";

import { useEffect, useState } from "react";
import { useStudentForm } from "./hooks/useStudentForm";
import { FormSection } from "./components/FormSection";
import { createFormSections, formSections } from "./config/formSections";
import { StudentHeader } from "./components/StudentHeader";
import { StudentProfile } from "./components/StudentProfile";
import { FormSubmitButton } from "./components/FormSubmitButton";

function CreateStudentPageContent() {
  const [sections, setSections] = useState(formSections);
  const { formData, isSubmitting, handleFieldChange, handleSubmit } =
    useStudentForm();

  useEffect(() => {
    const initializeSections = async () => {
      const loadedSections = await createFormSections();
      setSections(loadedSections);
    };
    initializeSections();
  }, []);

  return (
    <main className="flex-1 flex flex-col h-screen overflow-hidden">
      <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100/50">
        <div className="max-w-5xl mx-auto p-8">
          <StudentHeader onSubmit={handleSubmit} isSubmitting={isSubmitting} />
          <StudentProfile />
          <div className="space-y-8">
            {sections.map((section, index) => (
              <FormSection
                key={index}
                section={section}
                data={formData}
                onChange={handleFieldChange}
              />
            ))}
          </div>
          <FormSubmitButton
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
    </main>
  );
}

export default CreateStudentPageContent;
