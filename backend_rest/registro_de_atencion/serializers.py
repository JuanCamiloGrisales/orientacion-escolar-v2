from rest_framework import serializers

from .models import Archivo, Registro


class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = "__all__"


class RegistroSerializer(serializers.ModelSerializer):
    acuerdosPrevios = ArchivoSerializer(many=True, required=False)
    remision = ArchivoSerializer(many=True, required=False)
    piar = ArchivoSerializer(many=True, required=False)
    compromisoPadres = ArchivoSerializer(many=True, required=False)
    compromisoEstudiantes = ArchivoSerializer(many=True, required=False)

    class Meta:
        model = Registro
        fields = "__all__"

    def create(self, validated_data):
        acuerdos_previos_data = validated_data.pop("acuerdosPrevios", [])
        remision_data = validated_data.pop("remision", [])
        piar_data = validated_data.pop("piar", [])
        compromiso_padres_data = validated_data.pop("compromisoPadres", [])
        compromiso_estudiantes_data = validated_data.pop("compromisoEstudiantes", [])

        registro = Registro.objects.create(**validated_data)

        for archivo_data in acuerdos_previos_data:
            archivo, created = Archivo.objects.get_or_create(**archivo_data)
            registro.acuerdosPrevios.add(archivo)

        for archivo_data in remision_data:
            archivo, created = Archivo.objects.get_or_create(**archivo_data)
            registro.remision.add(archivo)

        for archivo_data in piar_data:
            archivo, created = Archivo.objects.get_or_create(**archivo_data)
            registro.piar.add(archivo)

        for archivo_data in compromiso_padres_data:
            archivo, created = Archivo.objects.get_or_create(**archivo_data)
            registro.compromisoPadres.add(archivo)

        for archivo_data in compromiso_estudiantes_data:
            archivo, created = Archivo.objects.get_or_create(**archivo_data)
            registro.compromisoEstudiantes.add(archivo)

        return registro

    def update(self, instance, validated_data):
        instance = super().update(instance, validated_data)
        return instance


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
