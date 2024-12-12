from django.db import models
from django.forms.models import model_to_dict
from django.utils.text import slugify


class Archivo(models.Model):
    """Model definition for Archivo."""

    archivo = models.FileField(upload_to="archivos/")

    class Meta:
        """Meta definition for Archivo."""

        verbose_name = "Archivo"
        verbose_name_plural = "Archivos"

    def __str__(self):
        return str(self.archivo.name)


class Estudiante(models.Model):
    """Model definition for Estudiante."""

    # Información personal
    nombreEstudiante = models.CharField(max_length=500, unique=True)
    tipoDocumentoEstudiante = models.CharField(max_length=500, blank=True, default="no establecido")
    numeroDocumentoEstudiante = models.CharField(max_length=500, blank=True, default="no establecido")
    sexo = models.CharField(max_length=500, blank=True, default="no establecido")
    genero = models.CharField(max_length=500, blank=True, default="no establecido")
    gradoEscolaridad = models.CharField(max_length=500, blank=True, default="no establecido")
    numeroTelefonoEstudiante = models.CharField(max_length=500, blank=True, default="no establecido")
    epsEstudiante = models.CharField(max_length=500, blank=True, default="no establecido")
    edadEstudiante = models.CharField(max_length=500, blank=True, default="no establecido")
    fechaNacimientoEstudiante = models.CharField(max_length=500, blank=True, default="no establecido")
    lugarNacimientoEstudiante = models.CharField(max_length=500, blank=True, default="no establecido")
    direccion = models.CharField(max_length=500, blank=True, default="no establecido")
    parentescoAcudiente = models.CharField(max_length=500, blank=True, default="no establecido")

    # Información general
    municipio = models.CharField(max_length=500, blank=True, default="no establecido")
    institucion = models.CharField(max_length=500, blank=True, default="no establecido")
    dane = models.CharField(max_length=500, blank=True, default="no establecido")
    sede = models.CharField(max_length=500, blank=True, default="no establecido")

    entidadPrestadoraDeSalud = models.CharField(max_length=500, blank=True, default="no establecido")
    personaDeConfianza = models.CharField(max_length=500, blank=True, default="no establecido")

    # Acudiente e información familiar
    telefonoAcudiente = models.CharField(max_length=500, blank=True, default="no establecido")
    documentoAcudiente = models.CharField(max_length=500, blank=True, default="no establecido")
    parentescoAcudiente = models.CharField(max_length=500, blank=True, default="no establecido")
    edadAcudiente = models.CharField(max_length=500, blank=True, default="no establecido")
    ocupacionAcudiente = models.CharField(max_length=500, blank=True, default="no establecido")
    nivelEducativo = models.CharField(max_length=500, blank=True, default="no establecido")
    estadoCivil = models.CharField(max_length=500, blank=True, default="no establecido")
    numeroHijos = models.CharField(max_length=500, blank=True, default="no establecido")
    lugarResidencia = models.CharField(max_length=500, blank=True, default="no establecido")
    tipoFamilia = models.CharField(max_length=500, blank=True, default="no establecido")
    hogarYBienestar = models.TextField(blank=True, default="no establecido")

    # Other fields
    condicionDiscapacidad = models.CharField(max_length=500, blank=True, default="no establecido")
    tipoDiscapacidad = models.CharField(max_length=500, blank=True, default="no establecido")
    talentoYCapacidadesExepcionales = models.TextField(blank=True, default="no establecido")

    # Archivos
    piar = models.ManyToManyField(Archivo, related_name="piar", blank=True)
    compromisoPadres = models.ManyToManyField(Archivo, related_name="compromisoPadres", blank=True)
    compromisoEstudiantes = models.ManyToManyField(Archivo, related_name="compromisoEstudiantes", blank=True)

    def __str__(self):
        return self.nombreEstudiante


class Registro(models.Model):
    """Model definition for Registro."""

    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, related_name="registros")
    consecutivo = models.IntegerField(blank=True)
    fecha = models.DateTimeField(null=True, blank=True)
    remitidoPor = models.TextField(blank=True, default="no establecido")
    nombreRemitidoPor = models.CharField(max_length=500, blank=True, default="no establecido")
    posiblesMotivosDeAtencion = models.TextField(blank=True, default="no establecido")
    lineaDeAtencion = models.CharField(max_length=500, blank=True, default="no establecido")
    tipoDeAtencion = models.CharField(max_length=500, blank=True, default="no establecido")
    # ------------------
    relatoEntrevistado = models.TextField(blank=True, default="no establecido")
    espectativasEntrevistado = models.TextField(blank=True, default="no establecido")
    acuerdosPrevios = models.ManyToManyField(Archivo, related_name="acuerdosPrevios", blank=True)
    # ------------------
    observaciones = models.TextField(blank=True, default="no establecido")
    activacionRuta = models.CharField(max_length=500, blank=True, default="no establecido")
    procesosConvivencia = models.TextField(blank=True, default="no establecido")
    remision = models.ManyToManyField(Archivo, related_name="remision", blank=True)
    estadoCaso = models.CharField(max_length=500, blank=True, default="no establecido")
    fechaProximoSeguimiento = models.DateTimeField(null=True, blank=True)
    nombreOrientadora = models.CharField(max_length=500, blank=True, default="no establecido")
    # ------------------
    created = models.DateTimeField(auto_now_add=True)
    resumen = models.TextField(blank=True)
    slug = models.SlugField(blank=True)
    resumenRelato = models.TextField(blank=True)
    estudiante_snapshot = models.JSONField(
        blank=True, null=True, verbose_name="Datos del estudiante al momento del registro"
    )

    class Meta:
        """Meta definition for Registro."""

        verbose_name = "Registro"
        verbose_name_plural = "Registros"

    def __str__(self):
        return str(self.id)

    def save(self, *args, **kwargs):
        if not self.id:
            self.estudiante_snapshot = self._create_estudiante_snapshot()
            ultimo_consecutivo = Registro.objects.filter(estudiante=self.estudiante).order_by("consecutivo").last()
            self.consecutivo = (ultimo_consecutivo.consecutivo if ultimo_consecutivo else 0) + 1

        for field in self._meta.fields:
            if getattr(self, field.name) is None and isinstance(field, (models.CharField, models.TextField)):
                setattr(self, field.name, "")

        if not self.slug:
            self.slug = slugify(self.estudiante.nombreEstudiante)

        super(Registro, self).save(*args, **kwargs)

    def _create_estudiante_snapshot(self):
        """Crea una copia de los datos del estudiante al momento del registro"""
        if self.estudiante:
            # Excluir campos que no queremos en el snapshot
            exclude_fields = ["id", "piar", "compromisoPadres", "compromisoEstudiantes", "registros"]
            return model_to_dict(self.estudiante, exclude=exclude_fields)
        return None
