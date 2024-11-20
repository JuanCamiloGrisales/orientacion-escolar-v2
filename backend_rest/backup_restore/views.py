import locale
import os
import shutil
import tempfile
import zipfile

from django.conf import settings
from django.http import FileResponse
from django.utils import timezone
from django.utils.timezone import localtime
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class BackupDatabaseView(APIView):
    """
    API view to handle database backup.
    Creates a zip file containing the database and uploads directory.
    """

    def get(self, request):
        locale.setlocale(locale.LC_TIME, "es_CO.UTF-8")
        fecha_actual = localtime(timezone.now()).strftime("%d de %B de %Y %H-%M")
        zip_filename = f"backup_{fecha_actual}.zip"

        temp_zip = tempfile.NamedTemporaryFile(delete=False, suffix=".zip")
        temp_dir = tempfile.mkdtemp()

        try:
            db_name = "backup.sqlite3"
            temp_db_path = os.path.join(temp_dir, db_name)
            shutil.copy(settings.DATABASES["default"]["NAME"], temp_db_path)

            uploads_path = os.path.join(settings.BASE_DIR, "uploads")
            if os.path.exists(uploads_path):
                temp_uploads_path = os.path.join(temp_dir, "uploads")
                shutil.copytree(uploads_path, temp_uploads_path)

            with zipfile.ZipFile(temp_zip.name, "w") as zipf:
                zipf.write(temp_db_path, db_name)
                if os.path.exists(uploads_path):
                    for root, _, files in os.walk(temp_uploads_path):
                        for file in files:
                            file_path = os.path.join(root, file)
                            arcname = os.path.relpath(file_path, temp_dir)
                            zipf.write(file_path, arcname)

            shutil.rmtree(temp_dir)
            return FileResponse(open(temp_zip.name, "rb"), as_attachment=True, filename=zip_filename)
        except Exception as e:
            shutil.rmtree(temp_dir, ignore_errors=True)
            os.unlink(temp_zip.name)
            raise e


class RestoreDatabaseView(APIView):
    """
    API view to handle database restoration.
    Restores the database and uploads directory from a provided zip file.
    """

    def post(self, request):
        backup_file = request.FILES.get("file")
        if not backup_file:
            return Response({"error": "No file provided"}, status=status.HTTP_400_BAD_REQUEST)

        with tempfile.TemporaryDirectory() as temp_dir:
            zip_path = os.path.join(temp_dir, "backup.zip")
            with open(zip_path, "wb") as f:
                shutil.copyfileobj(backup_file, f)

            with zipfile.ZipFile(zip_path, "r") as zip_ref:
                zip_ref.extractall(temp_dir)

            temp_db_path = os.path.join(temp_dir, "backup.sqlite3")
            if os.path.exists(temp_db_path):
                shutil.copy(temp_db_path, settings.DATABASES["default"]["NAME"])

            temp_uploads_path = os.path.join(temp_dir, "uploads")
            if os.path.exists(temp_uploads_path):
                uploads_path = os.path.join(settings.BASE_DIR, "uploads")
                os.makedirs(uploads_path, exist_ok=True)

                for root, _, files in os.walk(temp_uploads_path):
                    for file in files:
                        src_path = os.path.join(root, file)
                        rel_path = os.path.relpath(src_path, temp_uploads_path)
                        dst_path = os.path.join(uploads_path, rel_path)

                        if not os.path.exists(dst_path):
                            os.makedirs(os.path.dirname(dst_path), exist_ok=True)
                            shutil.copy2(src_path, dst_path)

        return Response({"message": "Database and uploads restored successfully"}, status=status.HTTP_200_OK)
