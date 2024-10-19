from rest_framework import serializers
from .models import Archivo, Registro


class ArchivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Archivo
        fields = "__all__"


class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Registro
        fields = "__all__"
