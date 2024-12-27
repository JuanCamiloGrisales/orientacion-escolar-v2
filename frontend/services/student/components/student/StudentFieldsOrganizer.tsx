"use client";

import { useFormSectionsStore } from "@/services/form/stores/formSectionsStore";
import { FilePreview } from "@/components/FilePreview";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { BackendFile } from "@/types/file";
import { File } from "lucide-react";

interface StudentFieldsOrganizerProps {
  studentData: any;
  layout: "compact" | "full";
}

export const StudentFieldsOrganizer = ({
  studentData,
  layout,
}: StudentFieldsOrganizerProps) => {
  const { sections, initialize } = useFormSectionsStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  // Si no hay secciones, mostrar skeleton
  if (!sections.length) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  // Mapping de campos del backend a campos del formulario
  const fieldMapping: { [key: string]: string } = {
    epsEstudiante: "entidadPrestadoraDeSalud",
    // parentescoAcudiente: "parentesco",
    // ocupacionAcudiente: "ocupacion",
  };

  const getFieldValue = (fieldName: string) => {
    // Si existe un mapping para el campo, usar ese
    const mappedField = fieldMapping[fieldName] || fieldName;
    return studentData[mappedField];
  };

  const renderValue = (field: any, value: any) => {
    if (!value) return "No especificado";

    if (field.type === "file" && Array.isArray(value)) {
      return value.length > 0 ? (
        <FilePreview
          files={value.map((file: BackendFile) => ({
            name: `${field.name}_${file.id}`,
            url: file.archivo,
            isBackendFile: true,
            id: file.id,
            type: file.archivo.toLowerCase().endsWith(".pdf")
              ? "application/pdf"
              : "application/octet-stream",
            size: 0,
          }))}
          onRemove={() => {}}
          readOnly
        />
      ) : (
        "Sin archivos"
      );
    }

    if (field.type === "richtext") {
      return value ? (
        <div
          className="prose prose-sm max-w-none"
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        "No especificado"
      );
    }

    if (field.type === "date") {
      try {
        const date = new Date(value);
        return date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      } catch {
        return value;
      }
    }

    return value.toString();
  };

  return (
    <div
      className={`grid gap-8 ${
        layout === "compact" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2"
      }`}
    >
      {sections.map((section) => {
        // Solo mostrar secciones que tengan al menos un campo con valor
        const hasData = section.fields.some(
          (field) => getFieldValue(field.name) !== undefined,
        );

        if (!hasData && layout === "compact") return null;

        return (
          <div
            key={section.title}
            className={`space-y-4 ${
              layout === "full"
                ? "bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
                : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`${
                  layout === "full"
                    ? "p-3 bg-indigo-50 rounded-2xl"
                    : "p-2 bg-indigo-50/50 rounded-xl"
                }`}
              >
                <section.icon
                  className={`${
                    layout === "full" ? "w-6 h-6" : "w-4 h-4"
                  } text-indigo-500`}
                />
              </div>
              <h3
                className={`font-semibold ${
                  layout === "full" ? "text-lg" : "text-sm"
                } text-indigo-600`}
              >
                {section.title}
              </h3>
            </div>

            <div
              className={`grid ${
                layout === "full" ? "grid-cols-2" : "grid-cols-1"
              } gap-4`}
            >
              {section.fields.map((field) => {
                const value = getFieldValue(field.name);
                if (value === undefined && layout === "compact") return null;

                return (
                  <div key={field.name} className="space-y-1">
                    <p
                      className={`font-medium ${
                        layout === "full" ? "text-sm" : "text-xs"
                      } text-gray-500`}
                    >
                      {field.label}
                    </p>
                    <div
                      className={`${
                        layout === "full"
                          ? "text-base bg-gray-50/50 p-3 rounded-xl"
                          : "text-sm"
                      } text-gray-700`}
                    >
                      {renderValue(field, value)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
