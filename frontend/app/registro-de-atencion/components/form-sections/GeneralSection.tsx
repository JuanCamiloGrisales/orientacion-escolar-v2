import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "../../FormField";

const GeneralSection = ({ formData, handleChange, memoizedOptions }) => (
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
        value={formData.general.fechaAtencion}
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
        value={formData.general.posiblesMotivos}
        onChange={handleChange}
        label="Posibles Motivos de Atención"
        options={memoizedOptions.posiblesMotivosDeAtencion}
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
);

export default GeneralSection;
