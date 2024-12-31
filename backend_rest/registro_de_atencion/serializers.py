from rest_framework import serializers

from .models import Archivo, Estudiante, Registro


class ArchivoSerializer(serializers.ModelSerializer):
    """
    Serializer for Archivo model.
    """

    class Meta:
        model = Archivo
        fields = "__all__"


class EstudianteSerializer(serializers.ModelSerializer):
    """
    Serializer for Estudiante model.
    """

    piar = ArchivoSerializer(many=True, read_only=True)
    compromisoPadres = ArchivoSerializer(many=True, read_only=True)
    compromisoEstudiantes = ArchivoSerializer(many=True, read_only=True)

    class Meta:
        model = Estudiante
        fields = "__all__"


class RegistroSerializer(serializers.ModelSerializer):
    """
    Serializer for Registro model.
    """

    acuerdosPrevios = ArchivoSerializer(many=True, read_only=True)
    remision = ArchivoSerializer(many=True, read_only=True)

    nombre_estudiante = serializers.SerializerMethodField()

    class Meta:
        model = Registro
        fields = "__all__"

    def get_nombre_estudiante(self, obj):
        """
        Get the name of the student associated with the Registro.
        """
        return obj.estudiante.nombreEstudiante.title()


class RegistroSummarySerializer(serializers.ModelSerializer):
    """
    Serializer for summarizing Registro model.
    """

    nombre_estudiante = serializers.SerializerMethodField()

    class Meta:
        model = Registro
        fields = ["id", "fecha", "resumen", "nombre_estudiante"]

    def get_nombre_estudiante(self, obj):
        """
        Get the name of the student associated with the Registro.
        """
        return obj.estudiante.nombreEstudiante


class EstudiantePreviewSerializer(serializers.ModelSerializer):
    """
    Serializer for previewing Estudiante model.
    """

    estadoCaso = serializers.SerializerMethodField()
    fechaProximoSeguimiento = serializers.SerializerMethodField()
    lineaDeAtencion = serializers.SerializerMethodField()

    class Meta:
        model = Estudiante
        fields = [
            "id",
            "nombreEstudiante",
            "gradoEscolaridad",
            "entidadPrestadoraDeSalud",
            "telefonoAcudiente",
            "numeroTelefonoEstudiante",
            "estadoCaso",
            "fechaProximoSeguimiento",
            "lineaDeAtencion",
        ]

    def get_estadoCaso(self, obj):
        """
        Get the case status from the latest Registro.
        """
        ultimo_registro = obj.registros.order_by("-fecha").first()
        return ultimo_registro.estadoCaso if ultimo_registro else None

    def get_fechaProximoSeguimiento(self, obj):
        """
        Get the next follow-up date from the latest Registro.
        """
        ultimo_registro = obj.registros.order_by("-fecha").first()
        return ultimo_registro.fechaProximoSeguimiento if ultimo_registro else None

    def get_lineaDeAtencion(self, obj):
        """
        Get the line of attention from the latest Registro.
        """
        ultimo_registro = obj.registros.order_by("-fecha").first()
        return ultimo_registro.lineaDeAtencion if ultimo_registro else None
