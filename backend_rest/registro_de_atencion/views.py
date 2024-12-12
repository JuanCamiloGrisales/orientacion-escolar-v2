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
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        try:
            # Crear el registro
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            registro = serializer.save()

            # Procesar los archivos
            file_fields = {
                "acuerdosPrevios": request.FILES.getlist("acuerdosPrevios", []),
                "remision": request.FILES.getlist("remision", []),
            }

            for field_name, files in file_fields.items():
                for file in files:
                    archivo = Archivo.objects.create(archivo=file)
                    getattr(registro, field_name).add(archivo)

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        if "json_data" in request.data:
            request.data._mutable = True
            request.data.update(json.loads(request.data["json_data"]))
            request.data._mutable = False
        return super().update(request, *args, **kwargs)

    @action(detail=True, methods=["get"], url_path="all-registros-by-alumno")
    def all_registros_by_alumno(self, request, pk=None):
        registros = Registro.objects.filter(estudiante_id=pk)
        serializer = RegistroSummarySerializer(registros, many=True)
        return Response(serializer.data)


class ArchivoViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Archivo.objects.all()
    serializer_class = ArchivoSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=["get"], url_path="download")
    def download(self, request, pk=None):
        try:
            archivo = self.get_object()
            return FileResponse(archivo.archivo.open(), as_attachment=True, filename=archivo.archivo.name)
        except Archivo.DoesNotExist:
            raise Http404


class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        try:
            # Crear el estudiante
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            estudiante = serializer.save()

            # Procesar los archivos
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


class EstudiantePreviewViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudiantePreviewSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=False, methods=["get"], url_path="preview")
    def preview(self, request):
        estudiantes = self.get_queryset()
        serializer = self.get_serializer(estudiantes, many=True)
        return Response(serializer.data)
