from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegistroViewSet

router = DefaultRouter()
router.register(r'registros', RegistroViewSet)

urlpatterns = [
    path('', include(router.urls)),
]