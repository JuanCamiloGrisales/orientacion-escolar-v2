'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { File, Pencil, Plus, Printer, Stars } from "lucide-react"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface StudentRecord {
    fecha: string
    resumen: string
}

export default function StudentDetail() {
    const [studentRecords, setStudentRecords] = useState<StudentRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [studentName, setStudentName] = useState<string | null>(null)
    const params = useParams()

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const nombreEstudiante = params.nombreEstudiante
                const response = await fetch(
                    `http://127.0.0.1:8000/api/registros/all-registros-by-alumno/?nombreEstudiante=${nombreEstudiante}`
                )
                if (!response.ok) throw new Error('Failed to fetch')
                const data = await response.json()
                setStudentRecords(data.sort((a: StudentRecord, b: StudentRecord) =>
                    new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
                ))
                if (data.length > 0) {
                    setStudentName(data[data.length - 1].nombreEstudiante)
                }
            } catch (error) {
                console.error('Error fetching records:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchRecords()
    }, [params.nombreEstudiante])

    if (loading) return (
        <div className="flex justify-center items-center min-h-[50vh]">
            <Skeleton className="w-[300px] h-[300px] rounded-2xl" />
        </div>
    )

    return (
        <div className="flex-1 p-8 flex flex-col bg-gray-50/50">
            {/* Header with gradient background */}
            <header className="w-full mb-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg p-8">
                <h1 className="text-2xl font-bold mb-2 text-gray-800">
                    Historial del Estudiante
                </h1>
                <p className="text-gray-600">
                    {studentName}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Add New Record Card - First Position */}
                <Card className="w-[300px] h-[300px] group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="w-full h-full group-hover:scale-105 transition-transform duration-200"
                    >
                        <Plus className="w-12 h-12 text-indigo-400 group-hover:text-indigo-500" />
                    </Button>
                </Card>

                {studentRecords.map((record, index) => (
                    <ContextMenu key={index}>
                        <ContextMenuTrigger>
                            <Card
                                className="w-[300px] h-[300px] p-6 flex flex-col gap-4 hover:shadow-xl 
                transition-all duration-300 bg-gradient-to-br from-white to-gray-50"
                            >
                                <div className="bg-indigo-50 rounded-xl p-3">
                                    <p className="text-sm text-indigo-600 font-medium text-center">
                                        {format(new Date(record.fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })}
                                    </p>
                                    <p className="text-xs text-indigo-400 text-center">
                                        {format(new Date(record.fecha), "HH:mm", { locale: es })}
                                    </p>
                                </div>

                                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent hover:scrollbar-thumb-indigo-300">
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {record.resumen}
                                    </p>
                                </div>
                            </Card>
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-64">
                            <ContextMenuItem>
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Editar</span>
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <Printer className="mr-2 h-4 w-4" />
                                <span>Imprimir</span>
                            </ContextMenuItem>
                            <ContextMenuItem className=" text-purple-700 focus:bg-purple-500/30 focus:text-purple-800">
                                <Stars className="mr-2 h-4 w-4" />
                                <span>Ver Transcripción</span>
                            </ContextMenuItem>
                            <ContextMenuSeparator />
                            <div className="px-2 py-1 text-xs text-gray-500">Archivos</div>
                            <ContextMenuItem>
                                <File className="mr-2 h-4 w-4" />
                                Archivo 1
                            </ContextMenuItem>
                            <ContextMenuItem>
                                <File className="mr-2 h-4 w-4" />
                                Archivo 2
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                ))}
            </div>
        </div>
    )
}