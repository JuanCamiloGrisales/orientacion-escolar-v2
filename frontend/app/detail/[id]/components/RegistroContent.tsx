"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import parse from "html-react-parser";
import { Clock, Flag, User } from "lucide-react";
import type { Registro } from "../types";
import { FileSection } from "./FileSection";
import { InfoSection } from "./InfoSection";

const formatDateLong = (date: string) => {
  return format(new Date(date), "EEEE d 'de' MMMM 'de' yyyy", {
    locale: es,
  });
};

export function RegistroContent({ registro }: { registro: Registro }) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Registro #{registro.consecutivo}
            </h1>
            <div className="flex items-center gap-2 mt-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <time className="capitalize">
                {formatDateLong(registro.fecha)}
              </time>
            </div>
          </div>
          <Badge
            variant={
              registro.estadoCaso === "Abierto" ? "default" : "secondary"
            }
          >
            {registro.estadoCaso}
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <InfoSection
            icon={User}
            title="Remitido por"
            value={registro.nombreRemitidoPor}
            subtitle={registro.remitidoPor}
          />
          <InfoSection
            icon={Flag}
            title="Línea de Atención"
            value={registro.lineaDeAtencion}
            subtitle={registro.tipoDeAtencion}
          />
        </div>
      </Card>

      {/* Main Content */}
      <div className="grid grid-cols-1 gap-6">
        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">
            Motivos de Atención
          </h2>
          <div className="text-gray-700 prose max-w-none">
            {parse(registro.posiblesMotivosDeAtencion)}
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-white">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">
            Relato del Entrevistado
          </h2>
          <div className="text-gray-700 prose max-w-none text-lg leading-relaxed">
            {parse(registro.relatoEntrevistado)}
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-4 text-purple-700">
            Expectativas
          </h2>
          <div className="text-gray-700 prose max-w-none">
            {parse(registro.expectativasEntrevistado)}
          </div>
        </Card>

        {/* Files Grid */}
        <div className="grid grid-cols-2 gap-6">
          {registro.acuerdosPrevios?.length > 0 && (
            <FileSection
              title="Acuerdos Previos"
              files={registro.acuerdosPrevios}
            />
          )}
          {registro.remision?.length > 0 && (
            <FileSection title="Remisión" files={registro.remision} />
          )}
        </div>

        {/* Conclusiones */}
        <Card className="p-6 hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-white">
          <h2 className="text-xl font-semibold mb-4 text-blue-700">
            Observaciones y Conclusiones
          </h2>
          <div className="space-y-4">
            <div className="text-gray-700 prose max-w-none text-lg leading-relaxed">
              {parse(registro.observaciones)}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InfoSection
                title="Activación de Ruta"
                value={registro.activacionRuta}
              />
              <InfoSection
                title="Procesos de Convivencia"
                value={parse(registro.procesosConvivencia)}
                isHtml
              />
              {registro.fechaProximoSeguimiento && (
                <InfoSection
                  title="Próximo Seguimiento"
                  value={formatDateLong(registro.fechaProximoSeguimiento)}
                />
              )}
              <InfoSection
                title="Orientadora"
                value={registro.nombreOrientadora}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
