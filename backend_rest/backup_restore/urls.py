from django.urls import path

from .views import BackupDatabaseView, RestoreDatabaseView

urlpatterns = [
    path("backup/", BackupDatabaseView.as_view(), name="backup-database"),
    path("restore/", RestoreDatabaseView.as_view(), name="restore-database"),
]
