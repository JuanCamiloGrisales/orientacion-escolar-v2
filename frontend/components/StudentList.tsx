import React, { useState } from 'react';
import { Download, Edit3, Filter, MoreVertical, Trash2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRegistros, Registro } from '@/lib/RegistrosContext';

const statusColors: { [key: string]: string } = {
    'Discharged': 'bg-green-500',
    'Ext. hospitalization': 'bg-red-500',
    'Unavailable': 'bg-gray-500',
    'Surgical intervention': 'bg-blue-500',
    'In surgery': 'bg-yellow-500',
    'Expected hospital stay': 'bg-purple-500',
}

interface StudentListProps {
    searchTerm: string;
    selectedTab: string;
}


const StudentList: React.FC<StudentListProps> = ({ searchTerm, selectedTab }) => {
    const { registros, loading, error } = useRegistros();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    if (loading) {
        return <div>Cargando estudiantes...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const uniqueStudents = registros.reduce((acc: Registro[], current) => {
        const existingStudent = acc.find(student => student.nombreEstudiante === current.nombreEstudiante);
        if (!existingStudent || current.consecutivo > existingStudent.consecutivo) {
            if (existingStudent) {
                acc.splice(acc.indexOf(existingStudent), 1);
            }
            acc.push(current);
        }
        return acc;
    }, []);

    const filteredStudents = uniqueStudents.filter((student) => {
        const searchMatch = student.nombreEstudiante.toLowerCase().includes(searchTerm.toLowerCase());
        const tabMatch = selectedTab === 'General' || student.lineaDeAtencion === selectedTab;  // Filter by tab
        return searchMatch && tabMatch;
    });


    const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Lista de Alumnos</h2>
                <div className="flex space-x-2">
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" /> Filtrar
                    </Button>
                    <Button>
                        <Download className="mr-2 h-4 w-4" /> Descargar Reporte
                    </Button>
                </div>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Grado</TableHead>
                        <TableHead>Motivos de atención</TableHead>
                        <TableHead>Tipo de Atención</TableHead>
                        <TableHead>Estado del Caso</TableHead>
                        <TableHead>Acciones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentStudents.map((student) => (
                        <TableRow key={student.id}>
                            <TableCell className="font-medium">
                                <div className="flex items-center">
                                    <Avatar className="mr-2">
                                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                        <AvatarFallback>{student.nombreEstudiante.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    {student.nombreEstudiante}
                                </div>
                            </TableCell>
                            <TableCell>{student.fecha ? new Date(student.fecha).toLocaleDateString() : ''}</TableCell>
                            <TableCell>{student.gradoEscolaridad}</TableCell>
                            <TableCell>{student.posiblesMotivosDeAtencion}</TableCell>
                            <TableCell>{student.tipoDeAtencion}</TableCell>
                            <TableCell>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[student.estadoCaso as keyof typeof statusColors] || 'bg-gray-500'} text-white`}>
                                    {student.estadoCaso}
                                </span>
                            </TableCell>
                            <TableCell>
                                <div className="flex space-x-2">
                                    <Button variant="ghost" size="icon">
                                        <Edit3 className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>View details</DropdownMenuItem>
                                            <DropdownMenuItem>Update status</DropdownMenuItem>
                                            <DropdownMenuItem>Print record</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4">
                <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={handlePreviousPage} disabled={currentPage === 1}>Anterior</Button>
                    {[...Array(totalPages)].map((_, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? 'bg-gray-200' : ''}
                        >
                            {index + 1}
                        </Button>
                    ))}
                    <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>Siguiente</Button>
                </div>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Página</span>
                    <select className="border rounded px-2 py-1" value={currentPage} onChange={(e) => handlePageChange(Number(e.target.value))}>
                        {[...Array(totalPages)].map((_, index) => (
                            <option key={index} value={index + 1}>{index + 1}</option>
                        ))}
                    </select>
                    <span className="text-sm text-gray-500">de {totalPages}</span>
                </div>
            </div>
        </div>
    );
};

export default StudentList;