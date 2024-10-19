from rest_framework import viewsets
from .models import Registro
from .serializers import RegistroSerializer


# Create your views here.
class RegistroViewSet(viewsets.ModelViewSet):
    queryset = Registro.objects.all()
    serializer_class = RegistroSerializer
    permission_classes = []
