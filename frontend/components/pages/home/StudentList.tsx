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
import { useEstudiantes } from "@/lib/StudentsContext";
import { Download, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import FilterModal, { Filters } from "./FilterModal";

const statusColors: { [key: string]: string } = {
  "En proceso": "bg-emerald-500",
  Cerrado: "bg-red-500",
  Unavailable: "bg-gray-500",
  "Surgical intervention": "bg-blue-500",
  "In surgery": "bg-yellow-500",
  "Expected hospital stay": "bg-purple-500",
};

const DEFAULT_FILTERS: Filters = {
  gradoEscolaridad: [],
  fechaProximoSeguimiento: { from: null, to: null },
};

interface StudentListProps {
  searchTerm: string;
  selectedTab: string;
}

const StudentList: React.FC<StudentListProps> = ({
  searchTerm,
  selectedTab,
}) => {
  const { estudiantes, loading, error } = useEstudiantes();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] =
    useState<Filters>(DEFAULT_FILTERS);
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    let count = 0;
    if (appliedFilters.gradoEscolaridad.length > 0) count++;
    if (
      appliedFilters.fechaProximoSeguimiento.from ||
      appliedFilters.fechaProximoSeguimiento.to
    )
      count++;
    setActiveFiltersCount(count);
  }, [appliedFilters]);

  const handleApplyFilters = (filters: Filters) => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  if (loading) {
    return <div>Cargando estudiantes...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const matchesSearch = (studentName: string, search: string): boolean => {
    if (!search) return true;
    const normalizedName = studentName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    const normalizedSearch = search
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    return normalizedSearch
      .split("")
      .every((char) => normalizedName.includes(char));
  };

  const calculateMatchScore = (studentName: string, search: string): number => {
    if (!search) return 1;
    const normalizedName = studentName
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    const normalizedSearch = search
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();
    let score = 0;
    let consecutiveMatches = 0;
    let lastMatchIndex = -1;
    for (let i = 0; i < normalizedSearch.length; i++) {
      const char = normalizedSearch[i];
      const index = normalizedName.indexOf(char, lastMatchIndex + 1);
      if (index !== -1) {
        if (index === lastMatchIndex + 1) {
          consecutiveMatches++;
          score += consecutiveMatches * 2;
        } else {
          consecutiveMatches = 0;
          score += 1;
        }
        lastMatchIndex = index;
      }
    }
    if (normalizedName.includes(normalizedSearch)) {
      score += 10;
    }
    return score;
  };

  const filteredStudents = estudiantes
    .filter((student) => {
      const searchMatch = matchesSearch(student.nombreEstudiante, searchTerm);
      const tabMatch =
        selectedTab === "General" || student.lineaDeAtencion === selectedTab;
      const gradoMatch =
        appliedFilters.gradoEscolaridad.length === 0 ||
        appliedFilters.gradoEscolaridad.includes(student.gradoEscolaridad);
      let fechaMatch = true;
      if (
        appliedFilters.fechaProximoSeguimiento.from &&
        appliedFilters.fechaProximoSeguimiento.to
      ) {
        const fecha = new Date(student.fechaProximoSeguimiento);
        fechaMatch =
          fecha >= appliedFilters.fechaProximoSeguimiento.from &&
          fecha <= appliedFilters.fechaProximoSeguimiento.to;
      }
      return searchMatch && tabMatch && gradoMatch && fechaMatch;
    })
    .map((student) => ({
      ...student,
      matchScore: calculateMatchScore(student.nombreEstudiante, searchTerm),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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

  const handleStudentClick = (nombreEstudiante: string) => {
    router.push(`/student/${nombreEstudiante}`);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
          Lista de Alumnos
        </h2>
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(true)}
            className="relative border-2 border-indigo-100 hover:border-indigo-200 transition-all duration-200"
          >
            <Filter className="mr-2 h-4 w-4 text-indigo-500" />
            Filtrar
            {activeFiltersCount > 0 && (
              <span
                className="absolute -top-2 -right-2 bg-gradient-to-r from-indigo-500 to-purple-500 
                             text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                {activeFiltersCount}
              </span>
            )}
          </Button>
          <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600">
            <Download className="mr-2 h-4 w-4" /> Descargar Reporte
          </Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>Grado</TableHead>
            <TableHead>EPS</TableHead>
            <TableHead>Teléfono Acudiente</TableHead>
            <TableHead>Teléfono Estudiante</TableHead>
            <TableHead>Estado del Caso</TableHead>
            <TableHead>Próxima Atención</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentStudents.map((student) => (
            <TableRow
              key={student.id}
              onClick={() => handleStudentClick(student.nombreEstudiante)}
              className="cursor-pointer"
            >
              <TableCell className="font-medium">
                <div className="flex items-center">
                  <Avatar className="mr-2">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>
                      {student.nombreEstudiante
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {student.nombreEstudiante}
                </div>
              </TableCell>
              <TableCell>{student.gradoEscolaridad}</TableCell>
              <TableCell>{student.epsEstudiante}</TableCell>
              <TableCell>{student.telefonoAcudiente}</TableCell>
              <TableCell>{student.numeroTelefonoEstudiante}</TableCell>
              <TableCell>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[student.estadoCaso as keyof typeof statusColors] || "bg-gray-500"} text-white`}
                >
                  {student.estadoCaso}
                </span>
              </TableCell>
              <TableCell>
                {student.fechaProximoSeguimiento
                  ? new Date(student.fechaProximoSeguimiento)
                    .toLocaleDateString("es-ES", {
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    .replace(",", "")
                  : ""}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <FilterModal
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={appliedFilters}
      />

      <div className="flex items-center justify-between mt-4">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          {[...Array(totalPages)].map((_, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? "bg-gray-200" : ""}
            >
              {index + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Página</span>
          <select
            className="border rounded px-2 py-1"
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
          >
            {[...Array(totalPages)].map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <span className="text-sm text-gray-500">de {totalPages}</span>
        </div>
      </div>
    </div>
  );
};

export default StudentList;
