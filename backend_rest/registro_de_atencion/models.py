from django.db import models
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


class Registro(models.Model):
    """Model definition for Registro."""

    consecutivo = models.IntegerField(blank=True)
    fecha = models.DateTimeField(null=True, blank=True)
    municipio = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    institucion = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    dane = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    sede = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    remitidoPor = models.TextField(null=True, blank=True, default="no establecido")
    nombreRemitidoPor = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    posiblesMotivosDeAtencion = models.TextField(null=True, blank=True, default="no establecido")
    lineaDeAtencion = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    tipoDeAtencion = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    entidadPrestadoraDeSalud = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    personaDeConfianza = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    # ------------------
    nombreEstudiante = models.CharField(max_length=500)
    tipoDocumentoEstudiante = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    numeroDocumentoEstudiante = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    gradoEscolaridad = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    numeroTelefonoEstudiante = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    epsEstudiante = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    edadEstudiante = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    fechaNacimientoEstudiante = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    lugarNacimientoEstudiante = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    telefonoAcudiente = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    documentoAcudiente = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    direccion = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    parentescoAcudiente = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    # ------------------
    sexo = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    genero = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    parentesco = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    nombre = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    edad = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    ocupacion = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    nivelEducativo = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    estadoCivil = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    numeroHijos = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    telefono = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    lugarResidencia = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    tipoFamilia = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    hogarYBienestar = models.TextField(null=True, blank=True, default="no establecido")
    # ------------------
    espectativasEntrevistado = models.TextField(null=True, blank=True, default="no establecido")
    acuerdosPrevios = models.ManyToManyField(Archivo, related_name="acuerdosPrevios", blank=True)
    # ------------------
    condicionDiscapacidad = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    tipoDiscapacidad = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    talentoYCapacidadesExepcionales = models.TextField(null=True, blank=True, default="no establecido")
    relatoEntrevistado = models.TextField(null=True, blank=True, default="no establecido")
    # ------------------
    observaciones = models.TextField(null=True, blank=True, default="no establecido")
    activacionRuta = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    procesosConvivencia = models.TextField(null=True, blank=True, default="no establecido")
    remision = models.ManyToManyField(Archivo, related_name="remision", blank=True)
    piar = models.ManyToManyField(Archivo, related_name="piar", blank=True)
    estadoCaso = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    compromisoPadres = models.ManyToManyField(Archivo, related_name="compromisoPadres", blank=True)
    compromisoEstudiantes = models.ManyToManyField(Archivo, related_name="compromisoEstudiantes", blank=True)
    fechaProximoSeguimiento = models.DateTimeField(null=True, blank=True)
    nombreOrientadora = models.CharField(max_length=500, null=True, blank=True, default="no establecido")
    # ------------------
    created = models.DateTimeField(auto_now_add=True)
    resumen = models.TextField(null=True, blank=True)
    slug = models.SlugField(null=True, blank=True)
    resumenRelato = models.TextField(null=True, blank=True)

    class Meta:
        """Meta definition for Registro."""

        verbose_name = "Registro"
        verbose_name_plural = "Registros"

    def save(self, *args, **kwargs):
        if not self.id:
            ultimo_consecutivo = (
                Registro.objects.filter(nombreEstudiante=self.nombreEstudiante).order_by("consecutivo").last()
            )
            self.consecutivo = (ultimo_consecutivo.consecutivo if ultimo_consecutivo else 0) + 1

        for field in self._meta.fields:
            if getattr(self, field.name) is None and isinstance(field, (models.CharField, models.TextField)):
                setattr(self, field.name, "")

        if not self.slug:
            self.slug = slugify(self.nombreEstudiante)

        super(Registro, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.id)
