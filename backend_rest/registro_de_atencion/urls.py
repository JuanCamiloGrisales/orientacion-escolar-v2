from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ArchivoViewSet, RegistroViewSet

router = DefaultRouter()
router.register(r"registros", RegistroViewSet)
router.register(r"archivos", ArchivoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
