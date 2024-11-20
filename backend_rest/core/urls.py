from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("registro_de_atencion.urls")),
    path("api/", include("editar_formulario.urls")),
    path("api/backup_restore/", include("backup_restore.urls")),  # Added backup_restore URLs
]
