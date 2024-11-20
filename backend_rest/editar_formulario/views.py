import os

from django.conf import settings
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from .files_reader import configurar_estudiantes
from .models import EditarCampos
from .serializers import EditarCamposSerializer


class EditarCamposAPIView(RetrieveUpdateAPIView):
    """
    Vista para obtener y actualizar el único registro de EditarCampos.
    """

    serializer_class = EditarCamposSerializer

    def get_object(self):
        """
        Obtiene la instancia única de EditarCampos, creándola si no existe.
        """
        obj, created = EditarCampos.objects.get_or_create(id=1)
        return obj

    def perform_update(self, serializer):
        """
        Actualiza los campos JSON de la instancia EditarCampos con los datos proporcionados en la solicitud.
        """
        instance = self.get_object()
        # Actualiza campos JSON
        for field in EditarCampos._meta.fields:
            if hasattr(field, "attname"):
                field_name = field.attname
                default_key = f"{field_name}Default"
                opciones_key = f"{field_name}Opciones"

                # Actualiza valores por defecto
                if default_key in self.request.data:
                    json_data = getattr(instance, field_name)
                    json_data["default"] = self.request.data[default_key]
                    setattr(instance, field_name, json_data)

                # Actualiza opciones
                if opciones_key in self.request.data:
                    opciones = self.request.data.get(opciones_key, [])
                    opciones = [opcion for opcion in opciones if opcion]
                    json_data = getattr(instance, field_name)
                    json_data["opciones"] = opciones
                    setattr(instance, field_name, json_data)

        serializer.save()


class UploadEstudiantesView(APIView):
    """
    Vista para manejar la carga de archivos de estudiantes y actualizar la instancia EditarCampos.
    """

    def post(self, request):
        """
        Maneja la solicitud POST para cargar un archivo de estudiantes.
        """
        file = request.FILES.get("file")
        if not file:
            return Response({"detail": "No file provided."}, status=status.HTTP_400_BAD_REQUEST)

        # Verifica que el archivo sea .xlsx
        if not file.name.endswith(".xlsx"):
            return Response(
                {"detail": "Invalid file type. Only .xlsx files are allowed."}, status=status.HTTP_400_BAD_REQUEST
            )

        # Guarda el archivo en el directorio apropiado
        upload_dir = os.path.join(settings.BASE_DIR, "uploads")
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        file_path = os.path.join(upload_dir, "estudiantes.xlsx")

        with open(file_path, "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        # Procesa el archivo
        try:
            estudiantes = configurar_estudiantes()
        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Extrae los nombres de los estudiantes
        nombres_estudiantes = list(estudiantes.keys())

        # Actualiza la instancia EditarCampos
        editar_campos, _ = EditarCampos.objects.get_or_create(id=1)
        json_data = editar_campos.nombreEstudiante
        json_data["opciones"] = nombres_estudiantes
        editar_campos.nombreEstudiante = json_data
        editar_campos.save()

        return Response({"detail": "Estudiantes updated successfully."}, status=status.HTTP_200_OK)
