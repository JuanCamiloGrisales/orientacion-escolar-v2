// FormField.tsx
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Upload } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useEffect, useMemo, useState } from 'react';

const CKEditor = dynamic<any>(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), { ssr: false });

interface FormFieldProps {
    section: string;
    field: string;
    type?: string;
    label?: string;
    value: any;
    options?: string[];
    onChange: (section: string, field: string, value: any) => void;
    [key: string]: any;
}

const FormField: React.FC<FormFieldProps> = ({
    section,
    field,
    type = "text",
    label,
    value,
    options = [],
    onChange,
    ...props
}) => {
    const [showOptions, setShowOptions] = useState(false);
    const [editorValue, setEditorValue] = useState(value || '');

    useEffect(() => {
        setEditorValue(value || '');
    }, [value]);

    const filteredOptions = useMemo(() => {
        if (!value || typeof value !== 'string') return options;
        return options.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        );
    }, [options, value]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let newValue = e.target.value;
        if (type === "file") {
            newValue = Array.from((e.target as HTMLInputElement).files || []).map(file => file.name).join(', ');
        }
        onChange(section, field, newValue);
    };

    const handleOptionClick = (option: string) => {
        onChange(section, field, option);
        setShowOptions(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Tab' && filteredOptions.length > 0 && showOptions) {
            e.preventDefault();
            handleOptionClick(filteredOptions[0]);
        }
    };

    const id = `${section}-${field}`;
    const formattedLabel = label || field.replace(/([A-Z])/g, ' $1').trim();

    // Handle different field types
    switch (type) {
        case "date":
            return (
                <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">{formattedLabel}</Label>
                    <div className="flex space-x-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "flex-1 justify-start text-left font-normal border-2 border-indigo-100 hover:border-indigo-200",
                                        !value && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 text-indigo-400" />
                                    {value ? format(new Date(value), "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={value ? new Date(value) : undefined}
                                    onSelect={date => {
                                        if (date) {
                                            // Preserve existing time when selecting new date
                                            const existingDate = value ? new Date(value) : new Date();
                                            date.setHours(existingDate.getHours());
                                            date.setMinutes(existingDate.getMinutes());
                                            onChange(section, field, date.toISOString());
                                        }
                                    }}
                                    initialFocus
                                    locale={es}
                                />
                            </PopoverContent>
                        </Popover>
                        <Input
                            type="time"
                            className="w-[150px] border-2 border-indigo-100 focus:border-indigo-300 rounded-lg"
                            value={value ? format(new Date(value), "HH:mm") : ""}
                            onChange={(e) => {
                                const [hours, minutes] = e.target.value.split(':').map(Number);
                                const newDate = value ? new Date(value) : new Date();
                                newDate.setHours(hours);
                                newDate.setMinutes(minutes);
                                onChange(section, field, newDate.toISOString());
                            }}
                        />
                    </div>
                </div>
            );

        case "richtext":
            return (
                <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">{formattedLabel}</Label>
                    <div className="rounded-xl border-2 border-indigo-100 focus-within:border-indigo-300 transition-all">
                        <CKEditor
                            editor={ClassicEditor}
                            data={editorValue}
                            config={{
                                toolbar: {
                                    items: [
                                        'heading',
                                        '|',
                                        'bold',
                                        'italic',
                                        'link',
                                        'bulletedList',
                                        'numberedList',
                                        '|',
                                        'undo',
                                        'redo'
                                    ],
                                    shouldNotGroupWhenFull: true
                                }
                            }}
                            onChange={(event, editor) => {
                                const data = editor.getData();
                                setEditorValue(data);
                                onChange(section, field, data);
                            }}
                        />
                    </div>
                </div>
            );

        case "file":
            return (
                <div className="space-y-2">
                    <Label htmlFor={id}>{formattedLabel}</Label>
                    <div className="flex items-center space-x-2">
                        <Input
                            id={id}
                            type="file"
                            multiple
                            onChange={handleInputChange}
                            {...props}
                        />
                        <Button type="button">
                            <Upload className="mr-2 h-4 w-4" />
                            Subir
                        </Button>
                    </div>
                    {Array.isArray(value) && (
                        <div className="mt-2 space-y-1">
                            {value.map((file: File, index: number) => (
                                <div key={index} className="text-sm">
                                    {file.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );

        default:
            return (
                <div className="space-y-2">
                    <Label className="text-gray-700 font-medium">{formattedLabel}</Label>
                    <div className="relative">
                        <Input
                            id={id}
                            type={type}
                            value={value || ''}
                            onChange={handleInputChange}
                            className="border-2 border-indigo-100 focus:border-indigo-300 rounded-lg
                                     transition-all duration-200 shadow-sm"
                            onFocus={() => options.length > 0 && setShowOptions(true)}
                            onBlur={() => setTimeout(() => setShowOptions(false))}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                            {...props}
                        />
                        {options.length > 0 && showOptions && (
                            <div className="absolute z-10 w-full mt-1 bg-white rounded-xl border-2 border-indigo-100 
                                          shadow-lg overflow-hidden">
                                {filteredOptions.length > 0 ? (
                                    filteredOptions.map((option, index) => (
                                        <div
                                            key={index}
                                            className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition-colors"
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                handleOptionClick(option);
                                            }}
                                        >
                                            {option}
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-4 py-2 text-gray-500">No hay opciones</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            );
    }
};

export default FormField;