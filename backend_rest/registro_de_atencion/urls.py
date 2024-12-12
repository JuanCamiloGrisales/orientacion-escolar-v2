from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ArchivoViewSet, EstudiantePreviewViewSet, EstudianteViewSet, RegistroViewSet

router = DefaultRouter()
router.register(r"registros", RegistroViewSet)
router.register(r"archivos", ArchivoViewSet)
router.register(r"estudiantes", EstudianteViewSet)
router.register(r"estudiante-preview", EstudiantePreviewViewSet, basename="estudiante-preview")

urlpatterns = [
    path("", include(router.urls)),
    path("registros/all-registros-by-alumno/<int:pk>/", RegistroViewSet.as_view({"get": "all_registros_by_alumno"})),
]
