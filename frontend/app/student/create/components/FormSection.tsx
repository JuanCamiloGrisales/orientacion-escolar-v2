import { Card, CardContent } from "@/components/ui/card";
import { FormSection as FormSectionType } from "../types";
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
              value={data[field.name]}
              onChange={(value) => onChange(field.name, value)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
