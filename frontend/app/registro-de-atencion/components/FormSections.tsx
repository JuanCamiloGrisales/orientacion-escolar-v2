import { Card, CardContent } from "@/components/ui/card";
import { FormSection as FormSectionType } from "@/components/forms/fields/types";
import { FormFieldComponent } from "@/components/forms/fields/FormField";

export const FormSection = ({
  section,
  data,
  onChange,
}: {
  section: FormSectionType;
  data: any;
  onChange: (field: string, value: any) => void;
}) => {
  const safeData = data || {};

  const getFieldValue = (fieldName: string) => {
    // Primero intentamos obtener el valor usando la sección actual
    const sectionValue = safeData[section.id]?.[fieldName];
    if (sectionValue !== undefined) {
      return sectionValue;
    }

    // Si no existe en la sección, buscamos en la ruta completa
    const [sectionId, subfield] = fieldName.split(".");
    if (subfield && safeData[sectionId]) {
      return safeData[sectionId][subfield];
    }

    return "";
  };

  const handleFieldChange = (fieldName: string, value: any) => {
    // Construimos el nombre completo del campo incluyendo la sección
    const fullFieldName = fieldName.includes(".")
      ? fieldName
      : `${section.id}.${fieldName}`;
    onChange(fullFieldName, value);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500">
            <section.icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            {section.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
          {section.fields.map((field) => (
            <FormFieldComponent
              key={field.name}
              field={field}
              value={getFieldValue(field.name)}
              onChange={(value) => handleFieldChange(field.name, value)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
