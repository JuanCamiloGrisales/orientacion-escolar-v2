
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FormField from '../../FormField';

const AgreementsSection = ({ formData, handleChange }) => (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                Acuerdos de Atención
            </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
            <FormField
                section="agreements"
                field="expectativasEntrevistado"
                type="richtext"
                value={formData.agreements.expectativasEntrevistado}
                onChange={handleChange}
                label="Expectativas del Entrevistado"
            />
            <FormField
                section="agreements"
                field="acuerdosPrevios"
                type="file"
                value={formData.agreements.acuerdosPrevios}
                onChange={handleChange}
                label="Acuerdos Previos"
            />
        </CardContent>
    </Card>
);

export default AgreementsSection;