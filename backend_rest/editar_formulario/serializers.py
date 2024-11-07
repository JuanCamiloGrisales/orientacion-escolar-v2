from rest_framework import serializers

from .models import EditarCampos


class EditarCamposSerializer(serializers.ModelSerializer):
    class Meta:
        model = EditarCampos
        fields = "__all__"
