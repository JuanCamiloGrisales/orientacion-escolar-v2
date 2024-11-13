from rest_framework import serializers

from .models import Archivo, Registro


class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = "__all__"


class RegistroSerializer(serializers.ModelSerializer):
    acuerdosPrevios = ArchivoSerializer(many=True, read_only=True)
    remision = ArchivoSerializer(many=True, read_only=True)
    piar = ArchivoSerializer(many=True, read_only=True)
    compromisoPadres = ArchivoSerializer(many=True, read_only=True)
    compromisoEstudiantes = ArchivoSerializer(many=True, read_only=True)

    class Meta:
        model = Registro
        fields = "__all__"


class RegistroLatestSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    nombreEstudiante = serializers.CharField()
    gradoEscolaridad = serializers.CharField()
    posiblesMotivosDeAtencion = serializers.CharField()
    lineaDeAtencion = serializers.CharField()
    tipoDeAtencion = serializers.CharField()
    estadoCaso = serializers.CharField()
    fechaProximoSeguimiento = serializers.DateTimeField()

    class Meta:
        model = Registro
        fields = [
            "id",
            "nombreEstudiante",
            "gradoEscolaridad",
            "posiblesMotivosDeAtencion",
            "lineaDeAtencion",
            "tipoDeAtencion",
            "estadoCaso",
            "fechaProximoSeguimiento",
        ]


class RegistroSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        fields = ["id", "fecha", "resumen", "nombreEstudiante"]
