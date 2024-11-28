import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

const FormTabs = () => (
  <TabsList className="bg-white p-2 rounded-xl shadow-sm inline-flex h-auto space-x-2">
    <TabsTrigger
      value="general"
      className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
    >
      General
    </TabsTrigger>
    <TabsTrigger
      value="student"
      className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
    >
      Datos Personales
    </TabsTrigger>
    <TabsTrigger
      value="family"
      className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
    >
      Composición Familiar
    </TabsTrigger>
    <TabsTrigger
      value="agreements"
      className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
    >
      Acuerdos de Atención
    </TabsTrigger>
    <TabsTrigger
      value="risks"
      className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
    >
      Descripción de Situaciones de Riesgo a Nivel Individual
    </TabsTrigger>
    <TabsTrigger
      value="appreciation"
      className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
    >
      Apreciación de la Docente Orientadora
    </TabsTrigger>
    <TabsTrigger
      value="additional"
      className="px-6 py-2.5 rounded-lg transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white data-[state=active]:shadow-md"
    >
      Información Adicional
    </TabsTrigger>
  </TabsList>
);

export default FormTabs;
