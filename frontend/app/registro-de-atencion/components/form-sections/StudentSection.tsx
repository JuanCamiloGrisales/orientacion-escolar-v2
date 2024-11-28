import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from "../../FormField";

const StudentSection = ({
  formData,
  handleChange,
  handleStudentChange,
  memoizedOptions,
}) => (
  <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
    <CardHeader className="pb-4">
      <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
        Datos Personales del Estudiante
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <FormField
        section="student"
        field="nombreCompleto"
        value={formData.student.nombreCompleto}
        onChange={handleStudentChange}
        label="Nombre Completo"
        options={memoizedOptions.nombreEstudiante}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          section="student"
          field="tipoDocumento"
          value={formData.student.tipoDocumento}
          onChange={handleChange}
          label="Tipo de Documento"
          options={memoizedOptions.tipoDocumentoEstudiante}
        />
        <FormField
          section="student"
          field="numeroDocumento"
          value={formData.student.numeroDocumento}
          onChange={handleChange}
          label="Número de Documento"
        />
      </div>
      <FormField
        section="student"
        field="gradoEscolaridad"
        value={formData.student.gradoEscolaridad}
        onChange={handleChange}
        label="Grado de Escolaridad"
        options={memoizedOptions.gradoEscolaridad}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          section="student"
          field="numeroTelefono"
          type="tel"
          value={formData.student.numeroTelefono}
          onChange={handleChange}
          label="Número de Teléfono"
        />
        <FormField
          section="student"
          field="eps"
          value={formData.student.eps}
          onChange={handleChange}
          label="EPS"
          options={memoizedOptions.entidadPrestadoraDeSalud}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          section="student"
          field="edad"
          type="number"
          value={formData.student.edad}
          onChange={handleChange}
          label="Edad"
        />
        <FormField
          section="student"
          field="fechaNacimiento"
          value={formData.student.fechaNacimiento}
          onChange={handleChange}
          label="Fecha de Nacimiento"
        />
      </div>
      <FormField
        section="student"
        field="lugarNacimiento"
        value={formData.student.lugarNacimiento}
        onChange={handleChange}
        label="Lugar de Nacimiento"
      />
      <FormField
        section="student"
        field="acudienteParentesco"
        value={formData.student.acudienteParentesco}
        onChange={handleChange}
        label="Acudiente / Parentesco"
        options={memoizedOptions.parentesco}
      />
      <div className="grid grid-cols-2 gap-4">
        <FormField
          section="student"
          field="telefonoAcudiente"
          type="tel"
          value={formData.student.telefonoAcudiente}
          onChange={handleChange}
          label="Teléfono del Acudiente"
        />
        <FormField
          section="student"
          field="documentoAcudiente"
          value={formData.student.documentoAcudiente}
          onChange={handleChange}
          label="Documento del Acudiente"
        />
      </div>
      <FormField
        section="student"
        field="direccionAcudiente"
        value={formData.student.direccionAcudiente}
        onChange={handleChange}
        label="Dirección del Acudiente"
      />
    </CardContent>
  </Card>
);

export default StudentSection;
