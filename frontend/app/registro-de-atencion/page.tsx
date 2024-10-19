"use client";
import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Upload } from 'lucide-react'

export default function RegistroForm() {
    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Formulario de Registro de Atención</h1>
            <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="general">Información General</TabsTrigger>
                    <TabsTrigger value="student">Detalles del Estudiante</TabsTrigger>
                    <TabsTrigger value="family">Información Familiar</TabsTrigger>
                    <TabsTrigger value="interview">Entrevista y Acuerdos</TabsTrigger>
                    <TabsTrigger value="additional">Información Adicional</TabsTrigger>
                </TabsList>

                <TabsContent className='overflow-y-auto max-h-[70vh] bg-white p-4 rounded-lg' value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información General</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="consecutivo">Consecutivo</Label>
                                    <Input id="consecutivo" type="number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fecha">Fecha</Label>
                                    <div className="flex">
                                        <Input id="fecha" type="text" className="rounded-r-none" />
                                        <Button type="button" variant="outline" className="rounded-l-none">
                                            <CalendarIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="municipio">Municipio</Label>
                                    <Input id="municipio" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="institucion">Institución</Label>
                                    <Input id="institucion" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dane">DANE</Label>
                                    <Input id="dane" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sede">Sede</Label>
                                    <Input id="sede" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="remitidoPor">Remitido Por</Label>
                                <Textarea id="remitidoPor" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nombreRemitidoPor">Nombre Remitido Por</Label>
                                <Input id="nombreRemitidoPor" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="posiblesMotivosDeAtencion">Posibles Motivos de Atención</Label>
                                <Textarea id="posiblesMotivosDeAtencion" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="lineaDeAtencion">Línea de Atención</Label>
                                    <Input id="lineaDeAtencion" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tipoDeAtencion">Tipo de Atención</Label>
                                    <Input id="tipoDeAtencion" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="entidadPrestadoraDeSalud">Entidad Prestadora de Salud</Label>
                                <Input id="entidadPrestadoraDeSalud" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="personaDeConfianza">Persona de Confianza</Label>
                                <Input id="personaDeConfianza" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="student">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalles del Estudiante</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="nombreEstudiante">Nombre del Estudiante</Label>
                                    <Input id="nombreEstudiante" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tipoDocumentoEstudiante">Tipo de Documento</Label>
                                    <Select>
                                        <option>Cédula de Ciudadanía</option>
                                        <option>Tarjeta de Identidad</option>
                                        <option>Pasaporte</option>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numeroDocumentoEstudiante">Número de Documento</Label>
                                    <Input id="numeroDocumentoEstudiante" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="gradoEscolaridad">Grado de Escolaridad</Label>
                                    <Input id="gradoEscolaridad" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numeroTelefonoEstudiante">Número de Teléfono</Label>
                                    <Input id="numeroTelefonoEstudiante" type="tel" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="epsEstudiante">EPS</Label>
                                    <Input id="epsEstudiante" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edadEstudiante">Edad</Label>
                                    <Input id="edadEstudiante" type="number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="fechaNacimientoEstudiante">Fecha de Nacimiento</Label>
                                    <div className="flex">
                                        <Input id="fechaNacimientoEstudiante" type="text" className="rounded-r-none" />
                                        <Button type="button" variant="outline" className="rounded-l-none">
                                            <CalendarIcon className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lugarNacimientoEstudiante">Lugar de Nacimiento</Label>
                                    <Input id="lugarNacimientoEstudiante" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="family">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información Familiar</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="telefonoAcudiente">Teléfono del Acudiente</Label>
                                    <Input id="telefonoAcudiente" type="tel" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="documentoAcudiente">Documento del Acudiente</Label>
                                    <Input id="documentoAcudiente" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="direccion">Dirección</Label>
                                    <Input id="direccion" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parentescoAcudiente">Parentesco del Acudiente</Label>
                                    <Input id="parentescoAcudiente" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sexo">Sexo</Label>
                                    <Select>
                                        <option>Masculino</option>
                                        <option>Femenino</option>
                                        <option>Otro</option>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="genero">Género</Label>
                                    <Input id="genero" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="parentesco">Parentesco</Label>
                                    <Input id="parentesco" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nombre">Nombre</Label>
                                    <Input id="nombre" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="edad">Edad</Label>
                                    <Input id="edad" type="number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="ocupacion">Ocupación</Label>
                                    <Input id="ocupacion" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nivelEducativo">Nivel Educativo</Label>
                                    <Input id="nivelEducativo" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="estadoCivil">Estado Civil</Label>
                                    <Select>
                                        <option>Soltero/a</option>
                                        <option>Casado/a</option>
                                        <option>Divorciado/a</option>
                                        <option>Viudo/a</option>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="numeroHijos">Número de Hijos</Label>
                                    <Input id="numeroHijos" type="number" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="telefono">Teléfono</Label>
                                    <Input id="telefono" type="tel" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lugarResidencia">Lugar de Residencia</Label>
                                    <Input id="lugarResidencia" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tipoFamilia">Tipo de Familia</Label>
                                    <Input id="tipoFamilia" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="hogarYBienestar">Hogar y Bienestar</Label>
                                <Textarea id="hogarYBienestar" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="interview">
                    <Card>
                        <CardHeader>
                            <CardTitle>Entrevista y Acuerdos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="espectativasEntrevistado">Expectativas del Entrevistado</Label>
                                <Textarea id="espectativasEntrevistado" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="acuerdosPrevios">Acuerdos Previos</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="acuerdosPrevios" type="file" multiple />
                                    <Button type="button">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Subir
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="additional">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información Adicional</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="condicionDiscapacidad">Condición de Discapacidad</Label>
                                    <Input id="condicionDiscapacidad" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="tipoDiscapacidad">Tipo de Discapacidad</Label>
                                    <Input id="tipoDiscapacidad" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="talentoYCapacidadesExepcionales">Talento y Capacidades Excepcionales</Label>
                                <Textarea id="talentoYCapacidadesExepcionales" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="relatoEntrevistado">Relato del Entrevistado</Label>
                                <Textarea id="relatoEntrevistado" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="observaciones">Observaciones</Label>
                                <Textarea id="observaciones" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="activacionRuta">Activación de Ruta</Label>
                                <Input id="activacionRuta" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="procesosConvivencia">Procesos de Convivencia</Label>
                                <Textarea id="procesosConvivencia" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="remision">Remisión</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="remision" type="file" multiple />
                                    <Button type="button">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Subir
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="piar">PIAR</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="piar" type="file" multiple />
                                    <Button type="button">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Subir
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="estadoCaso">Estado del Caso</Label>
                                <Select>
                                    <option>Abierto</option>
                                    <option>En Proceso</option>
                                    <option>Cerrado</option>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="compromisoPadres">Compromiso de Padres</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="compromisoPadres" type="file" multiple />
                                    <Button type="button">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Subir
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="compromisoEstudiantes">Compromiso de Estudiantes</Label>
                                <div className="flex items-center space-x-2">
                                    <Input id="compromisoEstudiantes" type="file" multiple />
                                    <Button type="button">
                                        <Upload className="mr-2 h-4 w-4" />
                                        Subir
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="fechaProximoSeguimiento">Fecha Próximo Seguimiento</Label>
                                <div className="flex">
                                    <Input id="fechaProximoSeguimiento" type="text" className="rounded-r-none" />
                                    <Button type="button" variant="outline" className="rounded-l-none">
                                        <CalendarIcon className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="nombreOrientadora">Nombre de la Orientadora</Label>
                                <Input id="nombreOrientadora" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <div className="mt-6 flex justify-end space-x-4">
                <Button variant="outline">Cancelar</Button>
                <Button>Enviar</Button>
            </div>
        </div>
    )
}