import json

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
        """
        Update a Registro instance. If 'json_data' is present in the request data,
        it will be parsed and added to the request data.
        """
        if "json_data" in request.data:
            request.data._mutable = True
            request.data.update(json.loads(request.data["json_data"]))
            request.data._mutable = False
        return super().update(request, *args, **kwargs)

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
        Update an Estudiante instance and handle file attachments.
        """
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance, data=request.data, partial=kwargs.get("partial", False))
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

            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class EstudiantePreviewViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A viewset for viewing Estudiante instances in preview mode.
    """

    queryset = Estudiante.objects.all()
    serializer_class = EstudiantePreviewSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["get"], url_path="preview")
    def preview(self, request):
        """
        Retrieve a preview of all Estudiante instances.
        """
        estudiantes = self.get_queryset()
        serializer = self.get_serializer(estudiantes, many=True)
        return Response(serializer.data)
