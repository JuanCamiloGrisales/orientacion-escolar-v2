import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatDateTimeLocal } from "@/utils/date";
import { useEffect, useRef, useState } from "react";
import { AutocompleteField } from "./AutocompleteField";
import { FileField } from "./FileField";
import { RichTextField } from "./RichTextField";
import type { FormField } from "./types";

interface FormFieldProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  options?: string[];
  type?: string;
  defaultValue?: string;
}

export function FormField({
  value,
  onChange,
  label,
  options = [],
  type = "text",
  defaultValue,
}: FormFieldProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  // Use empty string as fallback for undefined/null values
  const inputValue = value ?? defaultValue ?? "";

  useEffect(() => {
    // Only set default value if both value is undefined and defaultValue exists
    if (value === undefined && defaultValue !== undefined) {
      onChange(defaultValue);
    }
  }, [defaultValue]); // Only run when defaultValue changes

  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown") {
        setOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredOptions.length - 1),
        );
        e.preventDefault();
        break;
      case "ArrowUp":
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        e.preventDefault();
        break;
      case "Enter":
        if (filteredOptions[selectedIndex]) {
          onChange(filteredOptions[selectedIndex]);
          setSearchTerm("");
          setOpen(false);
        }
        e.preventDefault();
        break;
      case "Escape":
        setOpen(false);
        e.preventDefault();
        break;
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (open && listRef.current) {
      const list = listRef.current;
      const selectedItem = list.children[selectedIndex] as HTMLElement;
      if (selectedItem) {
        selectedItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex, open]);

  if (options && options.length > 0) {
    return (
      <div className="relative w-full">
        <Input
          type={type}
          value={inputValue}
          onChange={(e) => {
            onChange(e.target.value);
            setSearchTerm(e.target.value);
            setOpen(true);
            setSelectedIndex(0);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-xl border-2 focus:ring-2 focus:ring-indigo-100 
                    focus:border-indigo-300 transition-all duration-200"
          placeholder={`Ingrese ${label}`}
        />
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />
            <div
              className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-xl shadow-lg 
                        border-2 border-indigo-100"
            >
              <div
                ref={listRef}
                className="overflow-y-auto"
                style={{ maxHeight: "200px" }}
              >
                {filteredOptions.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full px-4 py-2 m-1 rounded-full transition-colors text-sm text-left block
                              ${
                                index === selectedIndex
                                  ? "bg-indigo-100 text-indigo-900"
                                  : "bg-indigo-50 hover:bg-indigo-100"
                              }`}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      onChange(option);
                      setSearchTerm("");
                      setOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <Input
      type={type}
      value={inputValue}
      onChange={(e) => onChange(e.target.value)}
      className="w-full"
      placeholder={`Ingrese ${label}`}
    />
  );
}

export function FormFieldComponent({
  field,
  value,
  onChange,
}: {
  field: FormField;
  value: any;
  onChange: (value: any) => void;
}) {
  const renderField = () => {
    switch (field.type) {
      case "richtext":
        return (
          <RichTextField
            value={value}
            onChange={onChange}
            label={field.label}
          />
        );
      case "file":
        return (
          <FileField value={value} onChange={onChange} label={field.label} />
        );
      case "datetime":
        const formattedValue = value
          ? formatDateTimeLocal(value)
          : field.defaultValue
            ? formatDateTimeLocal(new Date(field.defaultValue))
            : "";

        return (
          <Input
            type="datetime-local"
            value={formattedValue}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border-2 focus:ring-2 focus:ring-indigo-100 
                focus:border-indigo-300 transition-all duration-200 px-4 py-2
                bg-white shadow-sm hover:border-indigo-200"
            placeholder={`Seleccione ${field.label}`}
          />
        );
      default:
        return field.options?.length ? (
          <AutocompleteField
            value={value}
            onChange={onChange}
            label={field.label}
            type={field.type}
            options={field.options}
            defaultValue={field.defaultValue}
          />
        ) : (
          <Input
            type={field.type}
            value={value ?? field.defaultValue ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className="w-full"
            placeholder={`Ingrese ${field.label}`}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={field.name} className="text-gray-700 font-medium">
        {field.label}
      </Label>
      {renderField()}
    </div>
  );
}
