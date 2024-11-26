from django.urls import path

from .views import (
    EditarCamposAPIView,
    EstudiantesListView,
    UploadEstudiantesView,
)

urlpatterns = [
    path("editarcampos/", EditarCamposAPIView.as_view(), name="editarcampos"),
    path("upload/estudiantes/", UploadEstudiantesView.as_view(), name="upload_estudiantes"),
    path("lista-estudiantes/", EstudiantesListView.as_view(), name="estudiantes_list"),
]
