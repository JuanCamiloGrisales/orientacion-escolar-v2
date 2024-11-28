export type FormData = {
  general: {
    fechaAtencion: string;
    municipio: string;
    nombreEstablecimiento: string;
    codigoDane: string;
    sede: string;
    remitidoPor: string;
    nombreRemitente: string;
    posiblesMotivos: string;
    lineaAtencion: string;
    tipoAtencion: string;
    entidadSalud: string;
    personaConfianza: string;
  };
  student: {
    nombreCompleto: string;
    tipoDocumento: string;
    numeroDocumento: string;
    gradoEscolaridad: string;
    numeroTelefono: string;
    eps: string;
    edad: string;
    fechaNacimiento: string | null;
    lugarNacimiento: string;
    acudienteParentesco: string;
    telefonoAcudiente: string;
    documentoAcudiente: string;
    direccionAcudiente: string;
  };
  family: {
    sexo: string;
    genero: string;
    parentesco: string;
    ocupacionFamiliar: string;
    nivelEducativoFamiliar: string;
    estadoCivilFamiliar: string;
    tipoFamilia: string;
    condicionDiscapacidad: string;
    tipoDiscapacidad: string;
    talentoYCapacidadesExepcionales: string;
  };
  agreements: {
    expectativasEntrevistado: string;
    acuerdosPrevios: {
      files: File[];
      preview: string[];
    };
  };
  risks: {
    condicionDiscapacidad: string;
    tipoDiscapacidad: string;
    talentoCapacidades: string;
    relatoEntrevistado: string;
  };
  appreciation: {
    observaciones: string;
    activacionRuta: string;
    procesosConvivencia: string;
  };
  additional: {
    fechaProximoSeguimiento: string | null;
    remision: {
      files: File[];
      preview: string[];
    };
    piar: {
      files: File[];
      preview: string[];
    };
    estadoDelCaso: string;
    compromisoPadres: {
      files: File[];
      preview: string[];
    };
    compromisoEstudiantes: {
      files: File[];
      preview: string[];
    };
    nombreQuienRealiza: string;
  };
};

export type FormSectionProps = {
  formData: FormData;
  handleChange: (section: string, field: string, value: any) => void;
  memoizedOptions?: Record<string, string[]>;
};
