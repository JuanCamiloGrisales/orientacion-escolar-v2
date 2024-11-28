import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEstudiantes } from "@/lib/StudentsContext";
import React, { useEffect, useState } from "react";

export interface Filters {
  gradoEscolaridad: string[];
  fechaProximoSeguimiento: {
    from: Date | null;
    to: Date | null;
  };
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  initialFilters?: Filters; // Añadir prop para filtros iniciales
}

const DEFAULT_FILTERS: Filters = {
  gradoEscolaridad: [],
  fechaProximoSeguimiento: { from: null, to: null },
};

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  initialFilters = DEFAULT_FILTERS,
}) => {
  const { estudiantes } = useEstudiantes();
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [gradoEscolaridadOptions, setGradoEscolaridadOptions] = useState<
    string[]
  >([]);

  // Actualizar filtros cuando cambien los filtros iniciales
  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    const uniqueGrados = Array.from(
      new Set(estudiantes.map((student) => student.gradoEscolaridad)),
    );
    setGradoEscolaridadOptions(uniqueGrados);
  }, [estudiantes]);

  const handleCheckboxChange = (value: string) => {
    setFilters((prevFilters) => {
      const updatedGradoEscolaridad = prevFilters.gradoEscolaridad.includes(
        value,
      )
        ? prevFilters.gradoEscolaridad.filter((item) => item !== value)
        : [...prevFilters.gradoEscolaridad, value];
      return { ...prevFilters, gradoEscolaridad: updatedGradoEscolaridad };
    });
  };

  const handleDateChange = (date: { from: Date | null; to: Date | null }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      fechaProximoSeguimiento: date,
    }));
  };

  const handleClearFilters = () => {
    const clearedFilters = DEFAULT_FILTERS;
    setFilters(clearedFilters);
    onApply(clearedFilters); // Notificar al componente padre
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClose = () => {
    setFilters(initialFilters); // Restaurar al estado inicial al cerrar
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            Filtros de Búsqueda
          </DialogTitle>
        </DialogHeader>
        <Accordion type="multiple" className="space-y-4 mt-4">
          {/* Grado Escolaridad Filters */}
          <AccordionItem value="gradoEscolaridad">
            <AccordionTrigger className="text-lg font-semibold">
              Grado Escolaridad
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {gradoEscolaridadOptions.map((grado) => (
                  <div key={grado} className="flex items-center">
                    <Checkbox
                      checked={filters.gradoEscolaridad.includes(grado)}
                      onCheckedChange={() => handleCheckboxChange(grado)}
                      id={grado}
                    />
                    <Label htmlFor={grado} className="ml-2">
                      {grado}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Fecha Próximo Seguimiento */}
          <AccordionItem value="fechaProximoSeguimiento">
            <AccordionTrigger className="text-lg font-semibold">
              Fecha Próximo Seguimiento
            </AccordionTrigger>
            <AccordionContent>
              <DatePickerWithRange
                selected={filters.fechaProximoSeguimiento}
                onChange={handleDateChange}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <DialogFooter className="mt-6 flex justify-end space-x-2">
          <Button variant="outline" onClick={handleClose}>
            Cancelar
          </Button>
          <Button
            variant="outline"
            onClick={handleClearFilters}
            disabled={
              filters.gradoEscolaridad.length === 0 &&
              !filters.fechaProximoSeguimiento.from &&
              !filters.fechaProximoSeguimiento.to
            }
          >
            Eliminar Filtros
          </Button>
          <Button
            onClick={handleApply}
            disabled={
              filters.gradoEscolaridad.length === 0 &&
              !filters.fechaProximoSeguimiento.from &&
              !filters.fechaProximoSeguimiento.to
            }
          >
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
