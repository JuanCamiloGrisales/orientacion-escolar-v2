import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "../../FormField";

const FamilySection = ({ formData, handleChange, memoizedOptions }) => (
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
);

export default FamilySection;
