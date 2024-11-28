import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "../../FormField";

const AdditionalSection = ({ formData, handleChange, memoizedOptions }) => (
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
);

export default AdditionalSection;
