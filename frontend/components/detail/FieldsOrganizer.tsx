"use client";

import { useFormSectionsStore as useStudentFormSectionsStore } from "@/services/form/stores/studentFormSectionsStore";
import { FilePreview } from "@/components/FilePreview";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { RecordFieldsOrganizer } from "./record/RecordFieldsOrganizer";
import { BackendFile } from "@/types/file";

interface FieldsOrganizerProps {
  data: any;
  layout: "compact" | "full";
  mode: "student" | "record";
}

export const FieldsOrganizer = ({
  data,
  layout,
  mode,
}: FieldsOrganizerProps) => {
  // If it's a record, use the specialized component
  if (mode === "record") {
    return <RecordFieldsOrganizer data={data} layout={layout} />;
  }

  const { sections, initialize } = useStudentFormSectionsStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!sections.length) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  const getFieldValue = (fieldName: string) => {
    const mappedField = fieldName;
    return data[mappedField];
  };

  const renderValue = (field: any, value: any) => {
    if (!value) return "No especificado";

    if (field.type === "file" && Array.isArray(value)) {
      return value.length > 0 ? (
        <FilePreview mode="read" backendFiles={value} />
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
        layout === "compact" ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 "
      }`}
    >
      {sections.map((section) => {
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
