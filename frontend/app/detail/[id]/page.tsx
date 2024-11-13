"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import type { Registro } from "@/types/registro";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

// Keep KeyValuePair but update its styling
const KeyValuePair = ({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) => (
    <div className="flex flex-col gap-1.5 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
        <dt className="text-sm font-medium text-gray-500">{label}</dt>
        <dd className="text-base text-gray-900 font-medium">{value}</dd>
    </div>
);

// Update TextSection with modern styling
const TextSection = ({
    label,
    content,
}: {
    label: string;
    content: string;
}) => (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow mb-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2" />
            {label}
        </h3>
        <div
            className="prose prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    </div>
);

// Add new PDFViewer component at the top level
const PDFViewer = ({ url, onClose }: { url: string; onClose: () => void }) => {
    return (
        <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed left-0 top-0 h-screen bg-white z-50 w-full max-w-3xl shadow-2xl"
        >
            <div className="absolute top-4 -right-14 z-10">
                <Button variant="secondary" size="icon" onClick={onClose}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
            </div>
            <iframe src={url} className="w-full h-full" />
        </motion.div>
    );
};

// Update FileSection with modern styling
const FileSection = ({
    label,
    files,
}: {
    label: string;
    files: { id: number; archivo: string }[];
}) => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const handleDownload = async (fileId: number, fileName: string) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/archivos/${fileId}/download/`,
                { method: "GET" }
            );
            if (!response.ok) throw new Error("Failed to fetch file");

            const contentType = response.headers.get("Content-Type");
            const blob = await response.blob();

            if (contentType === "application/pdf") {
                const url = window.URL.createObjectURL(blob);
                setPdfUrl(url);
            } else {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <>
            <AnimatePresence>
                {pdfUrl && (
                    <PDFViewer
                        url={pdfUrl}
                        onClose={() => {
                            setPdfUrl(null);
                            // Cleanup URL when closing
                            if (pdfUrl) window.URL.revokeObjectURL(pdfUrl);
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
                    {label}
                </h3>
                <div className="grid grid-cols-1 gap-3">
                    {files.map((file) => (
                        <Card
                            key={file.id}
                            className="p-4 hover:bg-indigo-50 transition-colors cursor-pointer border-none shadow-sm"
                            onClick={() =>
                                handleDownload(file.id, file.archivo.split("/").pop() || "file")
                            }
                        >
                            <div className="flex items-center gap-3">
                                <FileText className="h-5 w-5 text-gray-400" />
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        {file.archivo.split("/").pop()}
                                    </p>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <Download className="h-4 w-4" />
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </>
    );
};

const SimpleFileSection = ({
    title,
    files,
}: {
    title: string;
    files: { id: number; archivo: string }[];
}) => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);

    const handleDownload = async (fileId: number, fileName: string) => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8000/api/archivos/${fileId}/download/`,
                { method: "GET" }
            );
            if (!response.ok) throw new Error("Failed to fetch file");

            const contentType = response.headers.get("Content-Type");
            const blob = await response.blob();

            if (contentType === "application/pdf") {
                const url = window.URL.createObjectURL(blob);
                setPdfUrl(url);
            } else {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = fileName;
                a.click();
                window.URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    return (
        <>
            <AnimatePresence>
                {pdfUrl && (
                    <PDFViewer
                        url={pdfUrl}
                        onClose={() => {
                            setPdfUrl(null);
                            if (pdfUrl) window.URL.revokeObjectURL(pdfUrl);
                        }}
                    />
                )}
            </AnimatePresence>

            <div className="grid grid-cols-1 gap-3">
                {files.map((file) => (
                    <Card
                        key={file.id}
                        className="p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                        onClick={() => handleDownload(file.id, file.archivo.split("/").pop() || "file")}
                    >
                        <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-gray-400" />
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{title}</p>
                            </div>
                            <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </>
    );
};

// Main component structure update
export default function DetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = React.use(params);
    const [registro, setRegistro] = useState<Registro | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchRegistro = async () => {
            try {
                const response = await fetch(
                    `http://127.0.0.1:8000/api/registros/${resolvedParams.id}/`
                );
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setRegistro(data);
            } catch (error) {
                console.error("Error fetching registro:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRegistro();
    }, [resolvedParams.id]);

    if (loading)
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Skeleton className="h-8 w-1/3 mb-6" /> {/* Title */}
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full" /> {/* Main content */}
                    <Skeleton className="h-40 w-full" /> {/* File section */}
                </div>
            </div>
        );

    if (!registro) return <div>No se encontró el registro</div>;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Button
                variant="ghost"
                onClick={() => router.back()}
                className="fixed top-8 left-8 z-40 bg-white shadow-md hover:shadow-lg transition-shadow"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver
            </Button>

            <div className="grid grid-cols-[1fr_2fr_1fr] gap-8 px-8 mx-auto">
                {/* Left column */}
                <div className="py-20">
                    <div className="sticky top-24 space-y-4">
                        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg">
                            <h2 className="font-bold text-xl mb-2">Registro de Atención</h2>
                            <p className="text-white/80 text-sm">{registro.nombreEstudiante}</p>
                            <p className="text-white/80 text-sm">
                                {format(new Date(registro?.fecha || new Date()), "dd 'de' MMMM 'de' yyyy", {
                                    locale: es,
                                })}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Center column - main content */}
                <div className="py-20 space-y-6">
                    <article className="space-y-12">
                        {/* Header */}
                        <header className="text-center space-y-4">
                            <p className="text-gray-500">
                                {format(new Date(registro.fecha), "dd 'de' MMMM 'de' yyyy", {
                                    locale: es,
                                })}
                            </p>
                        </header>

                        {/* Remisión Information - New Section */}
                        <section className="grid grid-cols-2 gap-6">
                            <KeyValuePair
                                label="Remitido Por"
                                value={registro.nombreRemitidoPor}
                            />
                            <KeyValuePair
                                label="Línea de Atención"
                                value={registro.lineaDeAtencion}
                            />
                            <KeyValuePair
                                label="Tipo de Atención"
                                value={registro.tipoDeAtencion}
                            />
                            <KeyValuePair
                                label="Entidad de Salud"
                                value={registro.entidadPrestadoraDeSalud}
                            />
                            <KeyValuePair
                                label="Persona de Confianza"
                                value={registro.personaDeConfianza}
                            />
                        </section>

                        {/* Expanded Student Information */}
                        <section>
                            <h3 className="text-xl font-semibold mb-4">
                                Información del Estudiante
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <KeyValuePair
                                    label="Nombre del Estudiante"
                                    value={registro.nombreEstudiante}
                                />
                                <KeyValuePair
                                    label="Documento"
                                    value={`${registro.tipoDocumentoEstudiante} ${registro.numeroDocumentoEstudiante}`}
                                />
                                <KeyValuePair label="Grado" value={registro.gradoEscolaridad} />
                                <KeyValuePair label="Edad" value={registro.edadEstudiante} />
                                <KeyValuePair label="EPS" value={registro.epsEstudiante} />
                                <KeyValuePair
                                    label="Fecha de Nacimiento"
                                    value={registro.fechaNacimientoEstudiante}
                                />
                                <KeyValuePair
                                    label="Lugar de Nacimiento"
                                    value={registro.lugarNacimientoEstudiante}
                                />
                                <KeyValuePair
                                    label="Teléfono"
                                    value={registro.numeroTelefonoEstudiante}
                                />
                                <KeyValuePair label="Dirección" value={registro.direccion} />
                                <KeyValuePair label="Sexo" value={registro.sexo} />
                                <KeyValuePair label="Género" value={registro.genero} />
                            </div>
                        </section>

                        {/* Acudiente Information - New Section */}
                        <section>
                            <h3 className="text-xl font-semibold mb-4">
                                Información del Acudiente
                            </h3>
                            <div className="grid grid-cols-2 gap-6">
                                <KeyValuePair
                                    label="Documento"
                                    value={registro.documentoAcudiente}
                                />
                                <KeyValuePair
                                    label="Teléfono"
                                    value={registro.telefonoAcudiente}
                                />
                                <KeyValuePair
                                    label="Parentesco"
                                    value={registro.parentescoAcudiente}
                                />
                            </div>
                        </section>

                        {/* Family Information - New Section */}
                        <section>
                            <h3 className="text-xl font-semibold mb-4">Información Familiar</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <KeyValuePair label="Parentesco" value={registro.parentesco} />
                                <KeyValuePair label="Nombre" value={registro.nombre} />
                                <KeyValuePair label="Edad" value={registro.edad} />
                                <KeyValuePair label="Ocupación" value={registro.ocupacion} />
                                <KeyValuePair
                                    label="Nivel Educativo"
                                    value={registro.nivelEducativo}
                                />
                                <KeyValuePair label="Estado Civil" value={registro.estadoCivil} />
                                <KeyValuePair
                                    label="Número de Hijos"
                                    value={registro.numeroHijos}
                                />
                                <KeyValuePair label="Teléfono" value={registro.telefono} />
                                <KeyValuePair
                                    label="Lugar de Residencia"
                                    value={registro.lugarResidencia}
                                />
                                <KeyValuePair
                                    label="Tipo de Familia"
                                    value={registro.tipoFamilia}
                                />
                            </div>
                        </section>

                        {/* Special Conditions - New Section */}
                        <section>
                            <h3 className="text-xl font-semibold mb-4">
                                Condiciones Especiales
                            </h3>
                            <div className="grid grid-cols-2 gap-6 mb-4">
                                <KeyValuePair
                                    label="Condición de Discapacidad"
                                    value={registro.condicionDiscapacidad}
                                />
                                <KeyValuePair
                                    label="Tipo de Discapacidad"
                                    value={registro.tipoDiscapacidad}
                                />
                            </div>
                            <TextSection
                                label="Talentos y Capacidades Excepcionales"
                                content={registro.talentoYCapacidadesExepcionales}
                            />
                            <TextSection
                                label="Expectativas del Entrevistado"
                                content={registro.espectativasEntrevistado}
                            />
                        </section>

                        {/* Institution Information */}
                        <section className="grid grid-cols-2 gap-6">
                            <KeyValuePair label="Institución" value={registro.institucion} />
                            <KeyValuePair label="Sede" value={registro.sede} />
                            <KeyValuePair label="Municipio" value={registro.municipio} />
                            <KeyValuePair label="DANE" value={registro.dane} />
                        </section>

                        {/* Long Text Fields */}
                        <TextSection
                            label="Motivos de Atención"
                            content={registro.posiblesMotivosDeAtencion}
                        />
                        <TextSection
                            label="Relato del Entrevistado"
                            content={registro.relatoEntrevistado}
                        />
                        <TextSection
                            label="Hogar y Bienestar"
                            content={registro.hogarYBienestar}
                        />
                        <TextSection label="Observaciones" content={registro.observaciones} />
                        <TextSection
                            label="Procesos de Convivencia"
                            content={registro.procesosConvivencia}
                        />

                        {/* File Attachments */}
                        <div className="space-y-6">
                            <FileSection
                                label="Acuerdos Previos"
                                files={registro.acuerdosPrevios}
                            />
                            <FileSection label="Remisión" files={registro.remision} />
                            <FileSection label="PIAR" files={registro.piar} />
                            <FileSection
                                label="Compromisos de Padres"
                                files={registro.compromisoPadres}
                            />
                            <FileSection
                                label="Compromisos de Estudiantes"
                                files={registro.compromisoEstudiantes}
                            />
                        </div>

                        {/* Footer Information */}
                        <footer className="pt-8 border-t border-gray-200">
                            <div className="grid grid-cols-2 gap-6">
                                <KeyValuePair
                                    label="Orientadora"
                                    value={registro.nombreOrientadora}
                                />
                                <KeyValuePair
                                    label="Estado del Caso"
                                    value={registro.estadoCaso}
                                />
                                {registro.fechaProximoSeguimiento && (
                                    <KeyValuePair
                                        label="Próximo Seguimiento"
                                        value={format(
                                            new Date(registro.fechaProximoSeguimiento),
                                            "dd/MM/yyyy",
                                            { locale: es }
                                        )}
                                    />
                                )}
                                <KeyValuePair
                                    label="Activación de Ruta"
                                    value={registro.activacionRuta}
                                />
                            </div>
                        </footer>
                    </article>
                </div>

                {/* Right column */}
                <div className="py-20">
                    <div className="sticky top-24 space-y-6">
                        <Card className="p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg">
                            <h3 className="font-semibold text-lg mb-4 text-gray-800">Acciones Rápidas</h3>
                            <div className="space-y-3">
                                <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600">
                                    <FileText className="mr-2 h-4 w-4" />
                                    Transcripción
                                </Button>
                            </div>
                        </Card>

                        {/* Activación de Ruta Section */}
                        <Card className="p-6 bg-gradient-to-br from-white to-gray-50 shadow-lg">
                            <h3 className="font-semibold text-lg mb-4 text-gray-800">Activación de Ruta</h3>
                            <SimpleFileSection
                                title={registro.activacionRuta}
                                files={registro.piar}
                            />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
