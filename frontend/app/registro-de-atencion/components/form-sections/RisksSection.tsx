
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from '../../FormField';

const RisksSection = ({ formData, handleChange, memoizedOptions }) => (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                Descripción de Situaciones de Riesgo a Nivel Individual
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <FormField
                section="risks"
                field="condicionDiscapacidad"
                value={formData.risks.condicionDiscapacidad}
                onChange={handleChange}
                label="Condición de Discapacidad"
                options={memoizedOptions.condicionDiscapacidad}
            />
            <FormField
                section="risks"
                field="tipoDiscapacidad"
                value={formData.risks.tipoDiscapacidad}
                onChange={handleChange}
                label="Tipo de Discapacidad"
                options={memoizedOptions.tipoDiscapacidad}
            />
            <FormField
                section="risks"
                field="talentoCapacidades"
                type="richtext"
                value={formData.risks.talentoCapacidades}
                onChange={handleChange}
                label="Talento y/o Capacidades Excepcionales"
                options={memoizedOptions.talentoYCapacidadesExepcionales}
            />
            <FormField
                section="risks"
                field="relatoEntrevistado"
                type="richtext"
                value={formData.risks.relatoEntrevistado}
                onChange={handleChange}
                label="Relato del Entrevistado"
            />
        </CardContent>
    </Card>
);

export default RisksSection;