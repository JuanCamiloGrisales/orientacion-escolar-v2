"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useMemo, useState } from 'react';
import { AutocompleteProvider, useAutocomplete } from './AutocompleteContext';
import FormField from './FormField';

type FormData = Record<string, Record<string, any>>;

export default function RegistroForm() {
    return (
        <AutocompleteProvider>
            <RegistroFormContent />
        </AutocompleteProvider>
    );
}

function RegistroFormContent() {
    const autocompleteData = useAutocomplete();
    const [formData, setFormData] = useState<FormData | null>(null);

    useEffect(() => {
        if (autocompleteData && !formData) {
            setFormData({
                general: {
                    fechaAtencion: null,
                    municipio: autocompleteData.municipio.default || "",
                    nombreEstablecimiento: autocompleteData.institucion.default || "",
                    codigoDane: autocompleteData.dane.default || "",
                    sede: autocompleteData.sede.default || "",
                    remitidoPor: autocompleteData.remitidoPor.default || "",
                    nombreRemitente: autocompleteData.nombreRemitidoPor.default || "",
                    posiblesMotivos: autocompleteData.posiblesMotivosDeAtencion.default || "",
                    lineaAtencion: autocompleteData.lineaDeAtencion.default || "",
                    tipoAtencion: autocompleteData.tipoDeAtencion.default || "",
                    entidadSalud: autocompleteData.entidadPrestadoraDeSalud.default || "",
                    personaConfianza: '',
                },
                student: {
                    nombreCompleto: '',
                    tipoDocumento: autocompleteData.tipoDocumentoEstudiante.default || "",
                    numeroDocumento: '',
                    gradoEscolaridad: autocompleteData.gradoEscolaridad.default || "",
                    numeroTelefono: '',
                    eps: '',
                    edad: '',
                    fechaNacimiento: null,
                    lugarNacimiento: '',
                    acudienteParentesco: autocompleteData.parentesco.default || "",
                    telefonoAcudiente: '',
                    documentoAcudiente: '',
                    direccionAcudiente: '',
                },
                family: {
                    sexo: autocompleteData.sexo.default || "",
                    genero: autocompleteData.genero.default || "",
                    parentesco: autocompleteData.parentesco.default || "",
                    ocupacionFamiliar: autocompleteData.ocupacion.default || "",
                    nivelEducativoFamiliar: autocompleteData.nivelEducativo.default || "",
                    estadoCivilFamiliar: autocompleteData.estadoCivil.default || "",
                    tipoFamilia: autocompleteData.tipoFamilia.default || "",
                    condicionDiscapacidad: '',
                    tipoDiscapacidad: '',
                    talentoYCapacidadesExepcionales: '',
                },
                agreements: {
                    expectativasEntrevistado: '',
                    acuerdosPrevios: [],
                },
                risks: {
                    condicionDiscapacidad: '',
                    tipoDiscapacidad: '',
                    talentoCapacidades: '',
                    relatoEntrevistado: '',
                },
                appreciation: {
                    observaciones: '',
                    activacionRuta: '',
                    procesosConvivencia: '',
                },
                additional: {
                    fechaProximoSeguimiento: null,
                    remision: [],
                    piar: [],
                    estadoDelCaso: '',
                    compromisoPadres: [],
                    compromisoEstudiantes: [],
                    nombreQuienRealiza: '',
                },
            });
        }
    }, [autocompleteData, formData]);

    const memoizedOptions = useMemo(() => {
        if (!autocompleteData) return {};

        return {
            municipio: autocompleteData.municipio.opciones,
            institucion: autocompleteData.institucion.opciones,
            dane: autocompleteData.dane.opciones,
            sede: autocompleteData.sede.opciones,
            remitidoPor: autocompleteData.remitidoPor.opciones,
            nombreRemitidoPor: autocompleteData.nombreRemitidoPor.opciones,
            posiblesMotivosDeAtencion: autocompleteData.posiblesMotivosDeAtencion.opciones,
            lineaDeAtencion: autocompleteData.lineaDeAtencion.opciones,
            tipoDeAtencion: autocompleteData.tipoDeAtencion.opciones,
            entidadPrestadoraDeSalud: autocompleteData.entidadPrestadoraDeSalud.opciones,
            nombreEstudiante: autocompleteData.nombreEstudiante.opciones,
            tipoDocumentoEstudiante: autocompleteData.tipoDocumentoEstudiante.opciones,
            gradoEscolaridad: autocompleteData.gradoEscolaridad.opciones,
            sexo: autocompleteData.sexo.opciones,
            genero: autocompleteData.genero.opciones,
            parentesco: autocompleteData.parentesco.opciones,
            ocupacion: autocompleteData.ocupacion.opciones,
            nivelEducativo: autocompleteData.nivelEducativo.opciones,
            estadoCivil: autocompleteData.estadoCivil.opciones,
            tipoFamilia: autocompleteData.tipoFamilia.opciones,
            condicionDiscapacidad: autocompleteData.condicionDiscapacidad.opciones,
            tipoDiscapacidad: autocompleteData.tipoDiscapacidad.opciones,
            talentoYCapacidadesExepcionales: autocompleteData.talentoYCapacidadesExepcionales.opciones,
            activacionRuta: autocompleteData.activacionRuta.opciones,
            estadoCaso: autocompleteData.estadoCaso.opciones,
            nombreOrientadora: autocompleteData.nombreOrientadora.opciones,
        };
    }, [autocompleteData]);

    const handleChange = (section: string, field: string, value: any) => {
        setFormData(prev => {
            const updated = {
                ...prev!,
                [section]: { ...prev![section], [field]: value }
            };
            return updated;
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    if (!autocompleteData || !formData) {
        return <div className="container mx-auto p-6">Cargando...</div>;
    }

    return (
        <div className="mx-auto px-8">
            <div className="max-h-screen overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    {/* Header with gradient */}
                    <div className="mb-8 my-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg p-8">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                            Registro de Atención
                        </h1>
                    </div>

                    <Tabs defaultValue="general" className="space-y-6">
                        <TabsList className="bg-white p-2 rounded-xl shadow-sm inline-flex h-auto space-x-2">
                            <TabsTrigger
                                value="general"
                                className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                            >
                                General
                            </TabsTrigger>
                            <TabsTrigger
                                value="student"
                                className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                            >
                                Datos Personales
                            </TabsTrigger>
                            <TabsTrigger
                                value="family"
                                className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                            >
                                Composición Familiar
                            </TabsTrigger>
                            <TabsTrigger
                                value="agreements"
                                className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                            >
                                Acuerdos de Atención
                            </TabsTrigger>
                            <TabsTrigger
                                value="risks"
                                className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                            >
                                Descripción de Situaciones de Riesgo a Nivel Individual
                            </TabsTrigger>
                            <TabsTrigger
                                value="appreciation"
                                className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                            >
                                Apreciación de la Docente Orientadora
                            </TabsTrigger>
                            <TabsTrigger
                                value="additional"
                                className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
                            >
                                Información Adicional
                            </TabsTrigger>
                        </TabsList>

                        {/* General */}
                        <TabsContent value="general">
                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                                        Información General
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        section="general"
                                        field="fechaAtencion"
                                        type="date"
                                        label="Fecha de Atención"
                                        value={formData.general.fechaAtencion || new Date().toISOString()}
                                        onChange={handleChange}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="general"
                                            field="municipio"
                                            label="Municipio"
                                            value={formData.general.municipio}
                                            options={memoizedOptions.municipio}
                                            onChange={handleChange}
                                        />
                                        <FormField
                                            section="general"
                                            field="nombreEstablecimiento"
                                            value={formData.general.nombreEstablecimiento}
                                            onChange={handleChange}
                                            label="Nombre del Establecimiento Educativo"
                                            options={memoizedOptions.institucion}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="general"
                                            field="codigoDane"
                                            value={formData.general.codigoDane}
                                            onChange={handleChange}
                                            label="Código DANE"
                                            options={memoizedOptions.dane}
                                        />
                                        <FormField
                                            section="general"
                                            field="sede"
                                            value={formData.general.sede}
                                            onChange={handleChange}
                                            label="Sede"
                                            options={memoizedOptions.sede}
                                        />
                                    </div>
                                    <FormField
                                        section="general"
                                        field="remitidoPor"
                                        value={formData.general.remitidoPor}
                                        onChange={handleChange}
                                        label="Remitido Por"
                                        options={memoizedOptions.remitidoPor}
                                    />
                                    <FormField
                                        section="general"
                                        field="nombreRemitente"
                                        value={formData.general.nombreRemitente}
                                        onChange={handleChange}
                                        label="Nombre del Remitente"
                                        options={memoizedOptions.nombreRemitidoPor}
                                    />
                                    <FormField
                                        section="general"
                                        field="posiblesMotivos"
                                        type="richtext"
                                        value={formData.general.posiblesMotivos}
                                        onChange={handleChange}
                                        label="Posibles Motivos de Atención"
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="general"
                                            field="lineaAtencion"
                                            value={formData.general.lineaAtencion}
                                            onChange={handleChange}
                                            label="Línea de Atención"
                                            options={memoizedOptions.lineaDeAtencion}
                                        />
                                        <FormField
                                            section="general"
                                            field="tipoAtencion"
                                            value={formData.general.tipoAtencion}
                                            onChange={handleChange}
                                            label="Tipo de Atención"
                                            options={memoizedOptions.tipoDeAtencion}
                                        />
                                    </div>
                                    <FormField
                                        section="general"
                                        field="entidadSalud"
                                        value={formData.general.entidadSalud}
                                        onChange={handleChange}
                                        label="Entidad Prestadora de Salud"
                                        options={memoizedOptions.entidadPrestadoraDeSalud}
                                    />
                                    <FormField
                                        section="general"
                                        field="personaConfianza"
                                        value={formData.general.personaConfianza}
                                        onChange={handleChange}
                                        label="Persona de Confianza (Mejor amig@ / novi@)"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Datos Personales */}
                        <TabsContent value="student">
                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                                        Datos Personales del Estudiante
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        section="student"
                                        field="nombreCompleto"
                                        value={formData.student.nombreCompleto}
                                        onChange={handleChange}
                                        label="Nombre Completo"
                                        options={memoizedOptions.nombreEstudiante}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="student"
                                            field="tipoDocumento"
                                            value={formData.student.tipoDocumento}
                                            onChange={handleChange}
                                            label="Tipo de Documento"
                                            options={memoizedOptions.tipoDocumentoEstudiante}
                                        />
                                        <FormField
                                            section="student"
                                            field="numeroDocumento"
                                            value={formData.student.numeroDocumento}
                                            onChange={handleChange}
                                            label="Número de Documento"
                                        />
                                    </div>
                                    <FormField
                                        section="student"
                                        field="gradoEscolaridad"
                                        value={formData.student.gradoEscolaridad}
                                        onChange={handleChange}
                                        label="Grado de Escolaridad"
                                        options={memoizedOptions.gradoEscolaridad}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="student"
                                            field="numeroTelefono"
                                            type="tel"
                                            value={formData.student.numeroTelefono}
                                            onChange={handleChange}
                                            label="Número de Teléfono"
                                        />
                                        <FormField
                                            section="student"
                                            field="eps"
                                            value={formData.student.eps}
                                            onChange={handleChange}
                                            label="EPS"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="student"
                                            field="edad"
                                            type="number"
                                            value={formData.student.edad}
                                            onChange={handleChange}
                                            label="Edad"
                                        />
                                        <FormField
                                            section="student"
                                            field="fechaNacimiento"
                                            value={formData.student.fechaNacimiento}
                                            onChange={handleChange}
                                            label="Fecha de Nacimiento"
                                        />
                                    </div>
                                    <FormField
                                        section="student"
                                        field="lugarNacimiento"
                                        value={formData.student.lugarNacimiento}
                                        onChange={handleChange}
                                        label="Lugar de Nacimiento"
                                    />
                                    <FormField
                                        section="student"
                                        field="acudienteParentesco"
                                        value={formData.student.acudienteParentesco}
                                        onChange={handleChange}
                                        label="Acudiente / Parentesco"
                                        options={memoizedOptions.parentesco}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="student"
                                            field="telefonoAcudiente"
                                            type="tel"
                                            value={formData.student.telefonoAcudiente}
                                            onChange={handleChange}
                                            label="Teléfono del Acudiente"
                                        />
                                        <FormField
                                            section="student"
                                            field="documentoAcudiente"
                                            value={formData.student.documentoAcudiente}
                                            onChange={handleChange}
                                            label="Documento del Acudiente"
                                        />
                                    </div>
                                    <FormField
                                        section="student"
                                        field="direccionAcudiente"
                                        value={formData.student.direccionAcudiente}
                                        onChange={handleChange}
                                        label="Dirección del Acudiente"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Composición Familiar */}
                        <TabsContent value="family">
                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                                        Composición Familiar
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="family"
                                            field="sexo"
                                            value={formData.family.sexo}
                                            onChange={handleChange}
                                            label="Sexo"
                                            options={memoizedOptions.sexo}
                                        />
                                        <FormField
                                            section="family"
                                            field="genero"
                                            value={formData.family.genero}
                                            onChange={handleChange}
                                            label="Género"
                                            options={memoizedOptions.genero}
                                        />
                                    </div>
                                    <FormField
                                        section="family"
                                        field="parentesco"
                                        value={formData.family.parentesco}
                                        onChange={handleChange}
                                        label="Parentesco"
                                        options={memoizedOptions.parentesco}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="family"
                                            field="nombreFamiliar"
                                            value={formData.family.nombreFamiliar}
                                            onChange={handleChange}
                                            label="Nombre"
                                        />
                                        <FormField
                                            section="family"
                                            field="edadFamiliar"
                                            type="number"
                                            value={formData.family.edadFamiliar}
                                            onChange={handleChange}
                                            label="Edad"
                                        />
                                    </div>
                                    <FormField
                                        section="family"
                                        field="ocupacionFamiliar"
                                        value={formData.family.ocupacionFamiliar}
                                        onChange={handleChange}
                                        label="Ocupación"
                                        options={memoizedOptions.ocupacion}
                                    />
                                    <FormField
                                        section="family"
                                        field="nivelEducativoFamiliar"
                                        value={formData.family.nivelEducativoFamiliar}
                                        onChange={handleChange}
                                        label="Nivel Educativo"
                                        options={memoizedOptions.nivelEducativo}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            section="family"
                                            field="estadoCivilFamiliar"
                                            value={formData.family.estadoCivilFamiliar}
                                            onChange={handleChange}
                                            label="Estado Civil"
                                            options={memoizedOptions.estadoCivil}
                                        />
                                        <FormField
                                            section="family"
                                            field="numeroHijosFamiliar"
                                            type="number"
                                            value={formData.family.numeroHijosFamiliar}
                                            onChange={handleChange}
                                            label="Número de Hijos"
                                        />
                                    </div>
                                    <FormField
                                        section="family"
                                        field="telefonoFamiliar"
                                        type="tel"
                                        value={formData.family.telefonoFamiliar}
                                        onChange={handleChange}
                                        label="Teléfono"
                                    />
                                    <FormField
                                        section="family"
                                        field="lugarResidenciaFamiliar"
                                        value={formData.family.lugarResidenciaFamiliar}
                                        onChange={handleChange}
                                        label="Lugar de Residencia"
                                    />
                                    <FormField
                                        section="family"
                                        field="tipoFamilia"
                                        value={formData.family.tipoFamilia}
                                        onChange={handleChange}
                                        label="Tipo de Familia"
                                        options={memoizedOptions.tipoFamilia}
                                    />
                                    <FormField
                                        section="family"
                                        field="hogarYBienestar"
                                        type="richtext"
                                        value={formData.family.hogarYBienestar}
                                        onChange={handleChange}
                                        label="Hogar y Bienestar"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Acuerdos de Atención */}
                        <TabsContent value="agreements">
                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                                        Acuerdos de Atención
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        section="agreements"
                                        field="expectativasEntrevistado"
                                        type="richtext"
                                        value={formData.agreements.expectativasEntrevistado}
                                        onChange={handleChange}
                                        label="Expectativas del Entrevistado"
                                    />
                                    <FormField
                                        section="agreements"
                                        field="acuerdosPrevios"
                                        type="file"
                                        value={formData.agreements.acuerdosPrevios}
                                        onChange={handleChange}
                                        label="Acuerdos Previos"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Descripción de Situaciones de Riesgo */}
                        <TabsContent value="risks">
                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                                        Descripción de Situaciones de Riesgo a Nivel Individual
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        section="risks"
                                        field="condicionDiscapacidad"
                                        value={formData.risks.condicionDiscapacidad}
                                        onChange={handleChange}
                                        label="Condición de Discapacidad"
                                        options={memoizedOptions.condicionDiscapacidad}
                                    />
                                    <FormField
                                        section="risks"
                                        field="tipoDiscapacidad"
                                        value={formData.risks.tipoDiscapacidad}
                                        onChange={handleChange}
                                        label="Tipo de Discapacidad"
                                        options={memoizedOptions.tipoDiscapacidad}
                                    />
                                    <FormField
                                        section="risks"
                                        field="talentoCapacidades"
                                        type="richtext"
                                        value={formData.risks.talentoCapacidades}
                                        onChange={handleChange}
                                        label="Talento y/o Capacidades Excepcionales"
                                        options={memoizedOptions.talentoYCapacidadesExepcionales}
                                    />
                                    <FormField
                                        section="risks"
                                        field="relatoEntrevistado"
                                        type="richtext"
                                        value={formData.risks.relatoEntrevistado}
                                        onChange={handleChange}
                                        label="Relato del Entrevistado"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Apreciación de la Docente */}
                        <TabsContent value="appreciation">
                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                                        Apreciación de la Docente Orientadora
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        section="appreciation"
                                        field="observaciones"
                                        type="richtext"
                                        value={formData.appreciation.observaciones}
                                        onChange={handleChange}
                                        label="Observaciones"
                                    />
                                    <FormField
                                        section="appreciation"
                                        field="activacionRuta"
                                        value={formData.appreciation.activacionRuta}
                                        onChange={handleChange}
                                        label="Activación de Ruta"
                                        options={memoizedOptions.activacionRuta}
                                    />
                                    <FormField
                                        section="appreciation"
                                        field="procesosConvivencia"
                                        type="richtext"
                                        value={formData.appreciation.procesosConvivencia}
                                        onChange={handleChange}
                                        label="Procesos de Convivencia"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Información Adicional */}
                        <TabsContent value="additional">
                            <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                                        Información Adicional
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <FormField
                                        section="additional"
                                        field="fechaProximoSeguimiento"
                                        type="date"
                                        value={formData.additional.fechaProximoSeguimiento}
                                        onChange={handleChange}
                                        label="Fecha del Próximo Seguimiento"
                                    />
                                    <FormField
                                        section="additional"
                                        field="remision"
                                        type="file"
                                        value={formData.additional.remision}
                                        onChange={handleChange}
                                        label="Remisión"
                                    />
                                    <FormField
                                        section="additional"
                                        field="piar"
                                        type="file"
                                        value={formData.additional.piar}
                                        onChange={handleChange}
                                        label="PIAR"
                                    />
                                    <FormField
                                        section="additional"
                                        field="estadoDelCaso"
                                        value={formData.additional.estadoDelCaso}
                                        onChange={handleChange}
                                        label="Estado del Caso"
                                        options={memoizedOptions.estadoCaso}
                                    />
                                    <FormField
                                        section="additional"
                                        field="compromisoPadres"
                                        type="file"
                                        value={formData.additional.compromisoPadres}
                                        onChange={handleChange}
                                        label="Compromiso de los Padres"
                                    />
                                    <FormField
                                        section="additional"
                                        field="compromisoEstudiantes"
                                        type="file"
                                        value={formData.additional.compromisoEstudiantes}
                                        onChange={handleChange}
                                        label="Compromiso de los Estudiantes"
                                    />
                                    <FormField
                                        section="additional"
                                        field="nombreQuienRealiza"
                                        value={formData.additional.nombreQuienRealiza}
                                        onChange={handleChange}
                                        label="Nombre de Quien Realiza el Registro"
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                    </Tabs>

                    <div className="mt-8 mb-12 flex justify-end space-x-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="border-2 rounded-lg border-indigo-100 hover:border-indigo-200 transition-all duration-200 px-8 py-4 text-lg"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r rounded-lg from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 px-8 py-4 text-lg"
                        >
                            Registrar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}