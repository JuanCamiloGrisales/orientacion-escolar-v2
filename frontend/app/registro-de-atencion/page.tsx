"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { CalendarIcon, Upload } from 'lucide-react';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type FormData = Record<string, Record<string, any>>;

const FormField = ({ section, field, type = "text", label, value, onChange, ...props }: {
    section: string;
    field: string;
    type?: string;
    label?: string;
    value: any;
    onChange: (section: string, field: string, value: any) => void;
    [key: string]: any;
}) => {
    const handleInputChange = (e: any) => {
        let newValue = e.target.value;
        if (type === "file") {
            newValue = Array.from(e.target.files);
        }
        onChange(section, field, newValue);
    };

    const id = `${section}-${field}`;
    const formattedLabel = label || field.replace(/([A-Z])/g, ' $1').trim();

    switch (type) {
        case "date":
            return (
                <DatePickerField
                    label={formattedLabel}
                    value={value}
                    onChange={(date: Date | null) => onChange(section, field, date)}
                    {...props}
                />
            );

        case "richtext":
            const modules = {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline',],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ]
            };
            return (
                <div className="space-y-2">
                    <Label htmlFor={id}>{formattedLabel}</Label>
                    <ReactQuill
                        id={id}
                        value={value || ''}
                        onChange={content => onChange(section, field, content)}
                        modules={modules}
                    />
                </div>
            );
        case "file":
            return (
                <div className="space-y-2">
                    <Label htmlFor={id}>{formattedLabel}</Label>
                    <div className="flex items-center space-x-2">
                        <Input id={id} type="file" multiple onChange={handleInputChange} {...props} />
                        <Button type="button">
                            <Upload className="mr-2 h-4 w-4" />
                            Subir
                        </Button>
                        {Array.isArray(value) && value.map((file, index) => (
                            <div key={index}>
                                {file.name}
                            </div>
                        ))}
                    </div>
                </div>
            );

        default:
            return (
                <div className="space-y-2">
                    <Label htmlFor={id}>{formattedLabel}</Label>
                    <Input
                        id={id}
                        type={type}
                        value={value || ''}
                        onChange={handleInputChange}
                        {...props}
                    />
                </div>
            );
    }
};

const DatePickerField = ({ label, value, onChange, ...props }: {
    label: string;
    value: Date | null;
    onChange: (date: Date | null) => void;
    [key: string]: any
}) => (
    <div className="space-y-2">
        <Label>{label}</Label>
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(value, "PPP", { locale: es }) : <span>Seleccionar fecha</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={value} onSelect={onChange} initialFocus locale={es} />
            </PopoverContent>
        </Popover>
    </div>
);

export default function RegistroForm() {
    const initialFormData: FormData = {
        general: { fechaAtencion: null },
        student: { fechaNacimiento: null },
        family: {},
        agreements: {},
        risks: {},
        appreciation: {},
        additional: { fechaProximoSeguimiento: null },
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleChange = (section: string, field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value }
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
    };

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold mb-6">Registro de Atención</h1>
                    <Tabs defaultValue="general" className="space-y-4">
                        <TabsList>
                            <TabsTrigger value="general">General</TabsTrigger>
                            <TabsTrigger value="student">Datos Personales</TabsTrigger>
                            <TabsTrigger value="family">Composición Familiar</TabsTrigger>
                            <TabsTrigger value="agreements">Acuerdos de Atención</TabsTrigger>
                            <TabsTrigger value="risks">Descripción de Situaciones de Riesgo a Nivel Individual</TabsTrigger>
                            <TabsTrigger value="appreciation">Apreciación de la Docente Orientadora</TabsTrigger>
                            <TabsTrigger value="additional">Información Adicional</TabsTrigger>
                        </TabsList>

                        {/*  General */}
                        <TabsContent value="general">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Información General</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField section="general" field="fechaAtencion" type="date" label="Fecha de Atención" value={formData.general.fechaAtencion} onChange={handleChange} />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="general" field="municipio" value={formData.general.municipio} onChange={handleChange} label="Municipio" />
                                        <FormField section="general" field="nombreEstablecimiento" value={formData.general.nombreEstablecimiento} onChange={handleChange} label="Nombre del Establecimiento Educativo" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="general" field="codigoDane" value={formData.general.codigoDane} onChange={handleChange} label="Código DANE" />
                                        <FormField section="general" field="sede" value={formData.general.sede} onChange={handleChange} label="Sede" />
                                    </div>
                                    <FormField section="general" field="remitidoPor" type="richtext" value={formData.general.remitidoPor} onChange={handleChange} label="Remitido Por" />
                                    <FormField section="general" field="nombreRemitente" value={formData.general.nombreRemitente} onChange={handleChange} label="Nombre del Remitente" />
                                    <FormField section="general" field="posiblesMotivos" type="richtext" value={formData.general.posiblesMotivos} onChange={handleChange} label="Posibles Motivos de Atención" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="general" field="lineaAtencion" value={formData.general.lineaAtencion} onChange={handleChange} label="Línea de Atención" />
                                        <FormField section="general" field="tipoAtencion" value={formData.general.tipoAtencion} onChange={handleChange} label="Tipo de Atención" />
                                    </div>
                                    <FormField section="general" field="entidadSalud" value={formData.general.entidadSalud} onChange={handleChange} label="Entidad Prestadora de Salud" />
                                    <FormField section="general" field="personaConfianza" value={formData.general.personaConfianza} onChange={handleChange} label="Persona de Confianza (Mejor amig@ / novi@)" />
                                </CardContent>
                            </Card>
                        </TabsContent>


                        {/* Datos Personales */}
                        <TabsContent value="student">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Datos Personales del Estudiante</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField section="student" field="nombreCompleto" value={formData.student.nombreCompleto} onChange={handleChange} label="Nombre Completo" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="student" field="tipoDocumento" value={formData.student.tipoDocumento} onChange={handleChange} label="Tipo de Documento" />
                                        <FormField section="student" field="numeroDocumento" value={formData.student.numeroDocumento} onChange={handleChange} label="Número de Documento" />
                                    </div>
                                    <FormField section="student" field="gradoEscolaridad" value={formData.student.gradoEscolaridad} onChange={handleChange} label="Grado de Escolaridad" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="student" field="numeroTelefono" type="tel" value={formData.student.numeroTelefono} onChange={handleChange} label="Número de Teléfono" />
                                        <FormField section="student" field="eps" value={formData.student.eps} onChange={handleChange} label="EPS" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="student" field="edad" type="number" value={formData.student.edad} onChange={handleChange} label="Edad" />
                                        <FormField section="student" field="fechaNacimiento" type="date" value={formData.student.fechaNacimiento} onChange={handleChange} label="Fecha de Nacimiento" />
                                    </div>
                                    <FormField section="student" field="lugarNacimiento" value={formData.student.lugarNacimiento} onChange={handleChange} label="Lugar de Nacimiento" />
                                    <FormField section="student" field="acudienteParentesco" value={formData.student.acudienteParentesco} onChange={handleChange} label="Acudiente / Parentesco" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="student" field="telefonoAcudiente" type="tel" value={formData.student.telefonoAcudiente} onChange={handleChange} label="Teléfono del Acudiente" />
                                        <FormField section="student" field="documentoAcudiente" value={formData.student.documentoAcudiente} onChange={handleChange} label="Documento del Acudiente" />
                                    </div>
                                    <FormField section="student" field="direccionAcudiente" value={formData.student.direccionAcudiente} onChange={handleChange} label="Dirección del Acudiente" />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Composición Familiar */}
                        <TabsContent value="family">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Composición Familiar</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="family" field="sexo" value={formData.family.sexo} onChange={handleChange} label="Sexo" />
                                        <FormField section="family" field="genero" value={formData.family.genero} onChange={handleChange} label="Género" />
                                    </div>
                                    <FormField section="family" field="parentesco" value={formData.family.parentesco} onChange={handleChange} label="Parentesco" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="family" field="nombreFamiliar" value={formData.family.nombreFamiliar} onChange={handleChange} label="Nombre" />
                                        <FormField section="family" field="edadFamiliar" type="number" value={formData.family.edadFamiliar} onChange={handleChange} label="Edad" />
                                    </div>
                                    <FormField section="family" field="ocupacionFamiliar" value={formData.family.ocupacionFamiliar} onChange={handleChange} label="Ocupación" />
                                    <FormField section="family" field="nivelEducativoFamiliar" value={formData.family.nivelEducativoFamiliar} onChange={handleChange} label="Nivel Educativo" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="family" field="estadoCivilFamiliar" value={formData.family.estadoCivilFamiliar} onChange={handleChange} label="Estado Civil" />
                                        <FormField section="family" field="numeroHijosFamiliar" type="number" value={formData.family.numeroHijosFamiliar} onChange={handleChange} label="Número de Hijos" />
                                    </div>
                                    <FormField section="family" field="telefonoFamiliar" type="tel" value={formData.family.telefonoFamiliar} onChange={handleChange} label="Teléfono" />
                                    <FormField section="family" field="lugarResidenciaFamiliar" value={formData.family.lugarResidenciaFamiliar} onChange={handleChange} label="Lugar de Residencia" />
                                    <FormField section="family" field="tipoFamilia" value={formData.family.tipoFamilia} onChange={handleChange} label="Tipo de Familia" />
                                    <FormField section="family" field="hogarYBienestar" type="richtext" value={formData.family.hogarYBienestar} onChange={handleChange} label="Hogar y Bienestar" />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Acuerdos de Atención */}
                        <TabsContent value="agreements">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Acuerdos de Atención</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField section="agreements" field="expectativasEntrevistado" type="richtext" value={formData.agreements.expectativasEntrevistado} onChange={handleChange} label="Expectativas del Entrevistado" />
                                    <FormField section="agreements" field="acuerdosPrevios" type="file" value={formData.agreements.acuerdosPrevios} onChange={handleChange} label="Acuerdos Previos" />
                                </CardContent>
                            </Card>
                        </TabsContent>


                        {/* Descripción de Situaciones de Riesgo */}
                        <TabsContent value="risks">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Descripción de Situaciones de Riesgo a Nivel Individual</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField section="risks" field="condicionDiscapacidad" value={formData.risks.condicionDiscapacidad} onChange={handleChange} label="Condición de Discapacidad" />
                                    <FormField section="risks" field="tipoDiscapacidad" value={formData.risks.tipoDiscapacidad} onChange={handleChange} label="Tipo de Discapacidad" />
                                    <FormField section="risks" field="talentoCapacidades" type="richtext" value={formData.risks.talentoCapacidades} onChange={handleChange} label="Talento y/o Capacidades Excepcionales" />
                                    <FormField section="risks" field="relatoEntrevistado" type="richtext" value={formData.risks.relatoEntrevistado} onChange={handleChange} label="Relato del Entrevistado" />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Apreciación de la Docente */}
                        <TabsContent value="appreciation">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Apreciación de la Docente Orientadora</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField section="appreciation" field="observaciones" type="richtext" value={formData.appreciation.observaciones} onChange={handleChange} label="Observaciones" />
                                    <FormField section="appreciation" field="activacionRuta" value={formData.appreciation.activacionRuta} onChange={handleChange} label="Activación de Ruta" />
                                    <FormField section="appreciation" field="procesosConvivencia" type="richtext" value={formData.appreciation.procesosConvivencia} onChange={handleChange} label="Procesos de Convivencia" />
                                </CardContent>
                            </Card>
                        </TabsContent>


                        {/* Información Adicional */}
                        <TabsContent value="additional">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Información Adicional</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <FormField section="additional" field="remision" type="file" value={formData.additional.remision} onChange={handleChange} label="Remisión" />
                                    <FormField section="additional" field="piar" type="file" value={formData.additional.piar} onChange={handleChange} label="PIAR" />
                                    <FormField section="additional" field="estadoDelCaso" value={formData.additional.estadoDelCaso} onChange={handleChange} label="Estado del Caso" />
                                    <FormField section="additional" field="compromisoPadres" type="file" value={formData.additional.compromisoPadres} onChange={handleChange} label="Compromiso de Padres" />
                                    <FormField section="additional" field="compromisoEstudiantes" type="file" value={formData.additional.compromisoEstudiantes} onChange={handleChange} label="Compromiso de Estudiantes" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField section="additional" field="fechaProximoSeguimiento" type="date" value={formData.additional.fechaProximoSeguimiento} onChange={handleChange} label="Fecha próximo seguimiento" />
                                        <FormField section="additional" field="nombreQuienRealiza" value={formData.additional.nombreQuienRealiza} onChange={handleChange} label="Nombre de quien realiza la atención" />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>

                    <div className="mt-6 flex justify-end space-x-4">
                        <Button type="button" variant="outline">Cancelar</Button>
                        <Button type="submit">Registrar</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}