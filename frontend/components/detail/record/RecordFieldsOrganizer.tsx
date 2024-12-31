import { RegistroDetalle } from "@/services/registro/types";
import { StudentSnapshot } from "./StudentSnapshot";
import { FileSection } from "./FileSection";
import { AdditionalInfo } from "./AdditionalInfo";
import { MainInfo } from "./MainInfo";
import { GeneralInfo } from "./GeneralInfo";

interface RecordFieldsOrganizerProps {
  data: RegistroDetalle;
  layout: "compact" | "full";
}

export const RecordFieldsOrganizer = ({ data, layout }: RecordFieldsOrganizerProps) => {
  if (layout === "compact") {
    return <MainInfo data={data} />;
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      {/* Left column - 4 columns width */}
      <div className="col-span-4 space-y-6">
        <StudentSnapshot data={data.estudiante_snapshot} />
        <FileSection
          acuerdosPrevios={data.acuerdosPrevios}
          remision={data.remision}
        />
        <AdditionalInfo
          activacionRuta={data.activacionRuta}
          estadoCaso={data.estadoCaso}
          fechaProximoSeguimiento={data.fechaProximoSeguimiento}
          nombreOrientadora={data.nombreOrientadora}
        />
      </div>

      {/* Right column - 8 columns width */}
      <div className="col-span-8 space-y-6">
        <GeneralInfo data={data} />
        <MainInfo data={data} />
      </div>
    </div>
  );
};
