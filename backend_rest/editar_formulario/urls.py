from django.urls import path

from .views import (
    EditarCamposAPIView,
    UploadEstudiantesView,
    UploadMunicipiosView,
)

urlpatterns = [
    path("editarcampos/", EditarCamposAPIView.as_view(), name="editarcampos"),
    path("upload/municipios/", UploadMunicipiosView.as_view(), name="upload_municipios"),
    path("upload/estudiantes/", UploadEstudiantesView.as_view(), name="upload_estudiantes"),
]
