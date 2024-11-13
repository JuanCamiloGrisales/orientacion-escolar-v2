from django.db.models import Max
from django.http import FileResponse, Http404
from rest_framework import permissions, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Archivo, Registro
from .serializers import ArchivoSerializer, RegistroLatestSerializer, RegistroSerializer, RegistroSummarySerializer


class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer
    permission_classes = []

    @action(detail=False, methods=["get"], url_path="latest-per-alumno")
    def latest_per_alumno(self, request):
        latest_registros = Registro.objects.filter(
            id__in=Registro.objects.values("nombreEstudiante").annotate(latest_id=Max("id")).values("latest_id")
        )
        serializer = RegistroLatestSerializer(latest_registros, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="all-registros-by-alumno")
    def all_registros_by_alumno(self, request):
        nombre_estudiante = request.query_params.get("nombreEstudiante")
        if not nombre_estudiante:
            return Response({"error": "nombreEstudiante parameter is required"}, status=400)

        registros = Registro.objects.filter(nombreEstudiante=nombre_estudiante)
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
