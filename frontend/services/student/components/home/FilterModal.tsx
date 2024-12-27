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
import React, { useEffect, useState } from "react";
import { StudentPreview } from "../../types";
import { DEFAULT_FILTERS, Filters } from "../../types/filters";
import { useFilterOptions } from "../../hooks/useFilterOptions";

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: Filters) => void;
  initialFilters?: Filters;
  students: StudentPreview[];
}

const FilterModal: React.FC<FilterModalProps> = ({
  isOpen,
  onClose,
  onApply,
  initialFilters = DEFAULT_FILTERS,
  students,
}) => {
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const { gradoEscolaridadOptions } = useFilterOptions(students);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleCheckboxChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      gradoEscolaridad: prev.gradoEscolaridad.includes(value)
        ? prev.gradoEscolaridad.filter((item) => item !== value)
        : [...prev.gradoEscolaridad, value],
    }));
  };

  const handleDateChange = (date: { from: Date | null; to: Date | null }) => {
    setFilters((prev) => ({
      ...prev,
      fechaProximoSeguimiento: date,
    }));
  };

  const hasActiveFilters =
    filters.gradoEscolaridad.length > 0 ||
    Boolean(filters.fechaProximoSeguimiento.from) ||
    Boolean(filters.fechaProximoSeguimiento.to);

  const handleClearFilters = () => {
    setFilters(DEFAULT_FILTERS);
    onApply(DEFAULT_FILTERS);
  };

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleClose = () => {
    setFilters(initialFilters);
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
            disabled={!hasActiveFilters}
          >
            Eliminar Filtros
          </Button>
          <Button onClick={handleApply} disabled={!hasActiveFilters}>
            Aplicar Filtros
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
