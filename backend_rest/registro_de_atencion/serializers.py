from rest_framework import serializers

from .models import Archivo, Estudiante, Registro


class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = "__all__"


class EstudianteSerializer(serializers.ModelSerializer):
    piar = ArchivoSerializer(many=True, read_only=True)
    compromisoPadres = ArchivoSerializer(many=True, read_only=True)
    compromisoEstudiantes = ArchivoSerializer(many=True, read_only=True)

    class Meta:
        model = Estudiante
        fields = "__all__"


class RegistroSerializer(serializers.ModelSerializer):
    acuerdosPrevios = ArchivoSerializer(many=True, read_only=True)
    remision = ArchivoSerializer(many=True, read_only=True)

    class Meta:
        model = Registro
        fields = "__all__"


class RegistroSummarySerializer(serializers.ModelSerializer):
    estudiante = serializers.SerializerMethodField()

    class Meta:
        model = Registro
        fields = ["id", "fecha", "resumen", "estudiante"]

    def get_estudiante(self, obj):
        return obj.estudiante.nombreEstudiante


class EstudiantePreviewSerializer(serializers.ModelSerializer):
    estadoCaso = serializers.SerializerMethodField()
    fechaProximoSeguimiento = serializers.SerializerMethodField()
    lineaDeAtencion = serializers.SerializerMethodField()

    class Meta:
        model = Estudiante
        fields = [
            "nombreEstudiante",
            "gradoEscolaridad",
            "epsEstudiante",
            "telefonoAcudiente",
            "numeroTelefonoEstudiante",
            "estadoCaso",
            "fechaProximoSeguimiento",
            "lineaDeAtencion",
        ]

    def get_estadoCaso(self, obj):
        ultimo_registro = obj.registros.order_by("-fecha").first()
        return ultimo_registro.estadoCaso if ultimo_registro else None

    def get_fechaProximoSeguimiento(self, obj):
        ultimo_registro = obj.registros.order_by("-fecha").first()
        return ultimo_registro.fechaProximoSeguimiento if ultimo_registro else None

    def get_lineaDeAtencion(self, obj):
        ultimo_registro = obj.registros.order_by("-fecha").first()
        return ultimo_registro.lineaDeAtencion if ultimo_registro else None
