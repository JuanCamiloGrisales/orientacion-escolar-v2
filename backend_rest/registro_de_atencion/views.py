import json

from django.db import models
from django.http import FileResponse, Http404
from rest_framework import permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Archivo, Estudiante, Registro
from .serializers import (
    ArchivoSerializer,
    EstudiantePreviewSerializer,
    EstudianteSerializer,
    RegistroSerializer,
    RegistroSummarySerializer,
)


class RegistroViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Registro instances.
    """

    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer
    permission_classes = []

    def get_serializer_class(self):
        """
        Return appropriate serializer class.
        """
        if self.action == "all_registros_by_alumno":
            return RegistroSummarySerializer
        return self.serializer_class

    def update(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            file_fields = ["acuerdosPrevios", "remision"]

            for field in file_fields:
                # Get all items for the field
                field_data = request.data.getlist(field, [])

                if field_data:
                    # First item might be JSON for eliminations
                    if isinstance(field_data[0], str):
                        try:
                            elimination_data = json.loads(field_data[0])
                            if "eliminated" in elimination_data:
                                eliminated_ids = elimination_data["eliminated"]
                                getattr(instance, field).remove(*eliminated_ids)
                                Archivo.objects.filter(id__in=eliminated_ids).delete()
                        except json.JSONDecodeError:
                            pass

                    # Process any files in the field_data
                    for item in field_data:
                        if hasattr(item, "content_type"):  # It's a file
                            archivo = Archivo.objects.create(archivo=item)
                            getattr(instance, field).add(archivo)

            # Update other fields
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        """
        Create a new Registro instance. If 'data' is present in the request data,
        it will be parsed and used to create the Registro. Also handles file attachments.
        """
        try:
            data = request.data.get("data")
            if data:
                data = json.loads(data)
            else:
                data = request.data

            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            registro = serializer.save()

            file_fields = {
                "acuerdosPrevios": request.FILES.getlist("acuerdosPrevios"),
                "remision": request.FILES.getlist("remision"),
            }

            for field_name, files in file_fields.items():
                for file in files:
                    archivo = Archivo.objects.create(archivo=file)
                    getattr(registro, field_name).add(archivo)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON data."}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=["get"], url_path="all-registros-by-alumno")
    def all_registros_by_alumno(self, request, pk=None):
        """
        Retrieve all Registro instances associated with a specific Estudiante.
        """
        registros = Registro.objects.filter(estudiante_id=pk)
        serializer = RegistroSummarySerializer(registros, many=True)
        return Response(serializer.data)


class ArchivoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing Archivo instances.
    """

    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=["get"], url_path="download")
    def download(self, request, pk=None):
        """
        Download the specified Archivo instance.
        """
        try:
            archivo = self.get_object()
            return FileResponse(archivo.archivo.open(), as_attachment=True, filename=archivo.archivo.name)
        except Archivo.DoesNotExist:
            raise Http404


class EstudianteViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing Estudiante instances.
    """

    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        """
        Create a new Estudiante instance and handle file attachments.
        """
        try:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            estudiante = serializer.save()

            file_fields = {
                "piar": request.FILES.getlist("piar", []),
                "compromisoPadres": request.FILES.getlist("compromisoPadres", []),
                "compromisoEstudiantes": request.FILES.getlist("compromisoEstudiantes", []),
            }

            for field_name, files in file_fields.items():
                for file in files:
                    archivo = Archivo.objects.create(archivo=file)
                    getattr(estudiante, field_name).add(archivo)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        """
        Update an instance of the model with the provided request data.
        This method handles the update of file fields, including the deletion of existing files
        and the addition of new files. The file fields handled are 'piar', 'compromisoPadres',
        and 'compromisoEstudiantes'.
        Args:
            request (Request): The request object containing the data for the update.
            *args: Additional positional arguments.
            **kwargs: Additional keyword arguments.
        Returns:
            Response: A Response object containing the serialized data of the updated instance
            or an error message if an exception occurs.
        Raises:
            Exception: If any error occurs during the update process, an error message is returned
            with a status of HTTP 400 Bad Request.
        """
        try:
            instance = self.get_object()
            file_fields = ["piar", "compromisoPadres", "compromisoEstudiantes"]

            for field in file_fields:
                # Get all items for the field
                field_data = request.data.getlist(field, [])

                if field_data:
                    # First item might be JSON for eliminations
                    if isinstance(field_data[0], str):
                        try:
                            elimination_data = json.loads(field_data[0])
                            if "eliminated" in elimination_data:
                                eliminated_ids = elimination_data["eliminated"]
                                getattr(instance, field).remove(*eliminated_ids)
                                Archivo.objects.filter(id__in=eliminated_ids).delete()
                        except json.JSONDecodeError:
                            pass

                    # Process any files in the field_data
                    for item in field_data:
                        if hasattr(item, "content_type"):  # It's a file
                            archivo = Archivo.objects.create(archivo=item)
                            getattr(instance, field).add(archivo)

            # Update other fields
            serializer = self.get_serializer(instance, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()

            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class EstudiantePreviewViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing Estudiante instances in preview mode.
    """

    serializer_class = EstudiantePreviewSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        """
        Return queryset ordered by the most recently updated records.
        """
        return Estudiante.objects.annotate(ultimo_registro=models.Max("registros__created")).order_by(
            "-ultimo_registro", "-id"
        )

    @action(detail=False, methods=["get"], url_path="preview")
    def preview(self, request):
        """
        Retrieve a preview of all Estudiante instances.
        """
        estudiantes = self.get_queryset()
        serializer = self.get_serializer(estudiantes, many=True)
        return Response(serializer.data)
