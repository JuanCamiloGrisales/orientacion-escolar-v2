from django.db import models

from .files_reader import configurar_municipios


def Default():
    return {"default": "", "opciones": []}


def DefaultInstitucion():
    return {"default": 'Escuela Normal Superior "Claudina Múnera"', "opciones": []}


def DefaultDane():
    return {"default": "117013001167", "opciones": []}


def DefaultSede():
    return {"default": "", "opciones": ["Anexa", "Principal"]}


def DefaultRemitidoPor():
    return {
        "default": "",
        "opciones": [
            "Docente",
            "Asesor de Grupo",
            "Coordinador",
            "Rector",
            "Acudiente o Tutor",
            "Estudiante (Por otro estudiante)",
            "Motivación Personal",
            "Remisión de Comité",
            "Focalización y/ o Seguimiento de orientación escolar",
            "Gestores de inclusión",
        ],
    }


def DefaultPosiblesMotivosDeAtencion():
    return {
        "default": "",
        "opciones": [
            "comportamientos agresivos",
            "Violencia intrafamiliar",
            "Posible hiper-actividad y énfasis",
            "Violencia sexual",
            "Violencia basada en genero",
            "Consumo de sustancia psicoactivas",
            "Ideación suicida",
            "Intento de suicidio",
            "Cuttin- autoflagelaci��n",
            "Baja tolerancia a la frustración",
            "Dificultades- problemas cognitivos del aprendizaje",
            "Embarazos en adolescentes",
            "Dificultades del orden emocional",
            "Acoso escolar Físico",
            "Acoso escolar Psicológico",
            "Acoso escolar Verbal",
            "Orientación sexual",
            "Trastornos en conducta alimentaria",
            "Delitos, según la ley colombiana",
        ],
    }


def DefaultLineaDeAtencion():
    return {"default": "", "opciones": ["Orientación", "Prevención", "Intervención"]}


def DefaultTipoDeAtencion():
    return {"default": "", "opciones": ["Individual", "Familiar", "Grupal"]}


def DefaultEntidadPrestadoraDeSalud():
    return {
        "default": "",
        "opciones": [
            "MALLAMAS",
            "AIC",
            "ASMET SALUD",
            "SALUD VIDA",
            "EMSANAR",
            "SISBEN",
            "COOMEVA",
            "NUEVA EPS",
            "SOS",
            "COSMITET",
            "SANITAS",
        ],
    }


def DefaultGradoEscolaridad():
    return {
        "default": "",
        "opciones": [
            "N/A",
            "Jardín",
            "Prejardín",
            "Grado 1",
            "Grado 2",
            "Grado 3",
            "Grado 4",
            "Grado 5",
            "Grado 6",
            "Grado 7",
            "Grado 8",
            "Grado 9",
            "Grado 10",
            "Grado 11",
            "Primer Semestre",
            "Segundo Semestre",
            "Tercer Semestre",
            "Cuarto Semestre",
        ],
    }


def DefaultSexo():
    return {
        "default": "",
        "opciones": [
            "Otro",
            "Mujer",
            "Hombre",
        ],
    }


def DefaultGenero():
    return {
        "default": "",
        "opciones": [
            "Otro",
            "Femenino",
            "Masculino",
        ],
    }


def DefaultParentesco():
    return {
        "default": "",
        "opciones": [
            "Padre",
            "Madre",
            "Tio o Tia",
            "Abuelo o Abuela Paterna",
            "Abuelo o Abuela Materna",
            "Filia Política",
            "Pareja",
        ],
    }


def DefaultOcupacion():
    return {
        "default": "",
        "opciones": [
            "Agricultor",
            "Conductor",
            "Docente",
            "Ama de Casa",
            "Jornalero",
            "Empresario",
            "Independiente",
            "Comerciante",
            "Oficios Varios",
        ],
    }


def DefaultNivelEducativo():
    return {
        "default": "",
        "opciones": [
            "No sabe no responde",
            "No estudió",
            "Primaria",
            "Secundaria",
            "Bachiller",
            "Técnico",
            "Tecnólogo",
            "Pregrado o Profesional",
            "Posgrado",
            "Doctorado",
            "Posdoctorado",
        ],
    }


def DefaultEstadoCivil():
    return {
        "default": "",
        "opciones": [
            "No sabe no responde",
            "Soltero",
            "Casado",
            "Divorciado",
            "Viudo",
            "Separado",
            "Unión Libre",
            "Comprometido",
            "N/A",
        ],
    }


def DefaultTipoDeFamilia():
    return {
        "default": "",
        "opciones": [
            "nuclear / heteroparental",
            "monoparental",
            "reconstituida",
            "extensa",
            "ensamblada",
            "familia de acogida",
            "adoptiva",
            "biparental",
            "homoparental",
            "Inmigrante",
            "Transnacional",
        ],
    }


def DefaultCondicionDiscapacidad():
    return {
        "default": "",
        "opciones": [
            "Tiene",
            "No tiene",
            "No sabe no responde",
            "N/A",
        ],
    }


def DefaultTipoDiscapacidad():
    return {
        "default": "",
        "opciones": [
            "Intelectual",
            "Física",
            "Visual",
            "Auditiva",
            "Motriz",
            "N/A",
        ],
    }


def DefaultTalentoYCapacidadesExepcionales():
    return {
        "default": "",
        "opciones": [
            "Talento científico",
            "Talento Tecnológico",
            "Talento Atlético Deportivo",
            "Doble excepcionalidad",
            "Talento subjetivo artístico",
        ],
    }


def DefaultActivacionDeRuta():
    return {
        "default": "",
        "opciones": [
            "Sí",
            "No remitido",
            "Coordinación de convivencia (Protocolo de Atención)",
            "Sector salud (Médico general, Fonoaudiología, Psicología)",
            "Sector protección (Comisaria de familia, ICBF, Policía de Infancia y adolescencia)",
            "Ministerio Público (personería, defensoría del pueblo, procuraduría, UARIV)",
            "Sector Justicia (fiscalía, policía)",
            "Comité de convivencia escolar",
            "Consejo directivo",
            "Consejo académico",
            "Seguimiento de orientación",
            "Atención de necesidades diversas de aprendizaje (PIAR)",
        ],
    }


def DefaultEstadoDelCaso():
    return {"default": "", "opciones": ["Abierto", "Cerrado"]}


def DefaultNombreOrientadora():
    return {"default": "Amparo Garcés Vidal", "opciones": []}


def DefaultMunicipio():
    municipios = configurar_municipios()
    return {"default": "", "opciones": municipios}


class EditarCampos(models.Model):
    municipio = models.JSONField(default=DefaultMunicipio)
    institucion = models.JSONField(default=DefaultInstitucion)
    dane = models.JSONField(default=DefaultDane)
    sede = models.JSONField(default=DefaultSede)
    remitidoPor = models.JSONField(default=DefaultRemitidoPor)
    nombreRemitidoPor = models.JSONField(default=Default)
    posiblesMotivosDeAtencion = models.JSONField(default=DefaultPosiblesMotivosDeAtencion)
    lineaDeAtencion = models.JSONField(default=DefaultLineaDeAtencion)
    tipoDeAtencion = models.JSONField(default=DefaultTipoDeAtencion)
    entidadPrestadoraDeSalud = models.JSONField(default=DefaultEntidadPrestadoraDeSalud)
    # ------------------
    nombreEstudiante = models.JSONField(default=Default)
    tipoDocumentoEstudiante = models.JSONField(default=Default)
    gradoEscolaridad = models.JSONField(default=DefaultGradoEscolaridad)
    # ------------------
    sexo = models.JSONField(default=DefaultSexo)
    genero = models.JSONField(default=DefaultGenero)
    parentesco = models.JSONField(default=DefaultParentesco)
    ocupacion = models.JSONField(default=DefaultOcupacion)
    nivelEducativo = models.JSONField(default=DefaultNivelEducativo)
    estadoCivil = models.JSONField(default=DefaultEstadoCivil)
    tipoFamilia = models.JSONField(default=DefaultTipoDeFamilia)
    # ------------------
    condicionDiscapacidad = models.JSONField(default=DefaultCondicionDiscapacidad)
    tipoDiscapacidad = models.JSONField(default=DefaultTipoDiscapacidad)
    talentoYCapacidadesExepcionales = models.JSONField(default=DefaultTalentoYCapacidadesExepcionales)
    # ------------------
    activacionRuta = models.JSONField(default=DefaultActivacionDeRuta)
    estadoCaso = models.JSONField(default=DefaultEstadoDelCaso)
    nombreOrientadora = models.JSONField(default=DefaultNombreOrientadora)

    class Meta:
        verbose_name = "Editar Campos"
        verbose_name_plural = "Editar Campos"

    def __str__(self):
        return str(self.id)
