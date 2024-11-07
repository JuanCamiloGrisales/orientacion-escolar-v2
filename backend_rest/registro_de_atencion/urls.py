from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import RegistroViewSet

router = DefaultRouter()
router.register(r"registros", RegistroViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
