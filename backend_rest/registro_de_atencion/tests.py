import json
from datetime import datetime

import pytz
from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Archivo, Estudiante, Registro


class BaseTestCase(APITestCase):
    """
    Base test case to set up common test data.
    """

    def setUp(self):
        # Create test student
        self.estudiante_data = {
            "nombreEstudiante": "Test Student",
            "gradoEscolaridad": "Noveno",
            "tipoDocumentoEstudiante": "CC",
            "numeroDocumentoEstudiante": "123456789",
        }
        self.estudiante = Estudiante.objects.create(**self.estudiante_data)

        # Create test file
        self.test_file = SimpleUploadedFile("test_file.txt", b"test content", content_type="text/plain")
        self.archivo = Archivo.objects.create(archivo=self.test_file)

        # Helper method to create multiple test files
        def create_test_files(count):
            files = []
            for i in range(count):
                file = SimpleUploadedFile(f"test_file_{i}.txt", f"test content {i}".encode(), content_type="text/plain")
                archivo = Archivo.objects.create(archivo=file)
                files.append(archivo)
            return files

        self.create_test_files = create_test_files


class RegistroViewSetTest(BaseTestCase):
    """
    Test cases for RegistroViewSet.
    """

    def setUp(self):
        super().setUp()
        timezone_aware_datetime = datetime.now(pytz.UTC).isoformat()
        self.registro_data = {
            "estudiante": self.estudiante.id,
            "fecha": timezone_aware_datetime,
            "remitidoPor": "Test Remitente",
            "posiblesMotivosDeAtencion": "Test Motivo",
            "lineaDeAtencion": "Test Linea",
            "tipoDeAtencion": "Test Tipo",
            "estadoCaso": "Abierto",
        }

    def test_create_registro(self):
        """
        Test creating a Registro instance.
        """
        url = reverse("registro-list")
        response = self.client.post(url, self.registro_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Registro.objects.count(), 1)

    def test_get_registros_by_alumno(self):
        """
        Test retrieving all Registro instances by Estudiante.
        """
        Registro.objects.create(
            estudiante=self.estudiante, **{k: v for k, v in self.registro_data.items() if k != "estudiante"}
        )

        url = reverse("registro-all-registros-by-alumno", kwargs={"pk": self.estudiante.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_registro_with_file_deletion(self):
        """Test updating a Registro instance with file deletion"""
        # Create a registro with some files
        registro = Registro.objects.create(
            **{k: v for k, v in self.registro_data.items() if k != "estudiante"}, estudiante=self.estudiante
        )

        # Add some test files to remision
        files = self.create_test_files(3)
        for file in files:
            registro.remision.add(file)

        # Prepare update data with file deletion
        update_data = {"remision": {"eliminated": [files[0].id, files[1].id]}}

        url = reverse("registro-detail", kwargs={"pk": registro.id})
        response = self.client.patch(url, update_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        registro.refresh_from_db()
        self.assertEqual(registro.remision.count(), 1)
        self.assertEqual(Archivo.objects.filter(id__in=[f.id for f in files[:2]]).count(), 0)

    def test_update_registro_with_file_deletion_and_addition(self):
        """Test updating a Registro instance with both file deletion and addition"""
        registro = Registro.objects.create(
            **{k: v for k, v in self.registro_data.items() if k != "estudiante"}, estudiante=self.estudiante
        )

        # Add initial files
        initial_files = self.create_test_files(2)
        for file in initial_files:
            registro.remision.add(file)

        # Prepare update data
        new_file = SimpleUploadedFile("new_file.txt", b"new content", content_type="text/plain")

        # Use FormData format with json_data field
        data = {"json_data": json.dumps({"remision": {"eliminated": [initial_files[0].id]}})}

        # Add new file to the request
        data["remision"] = new_file

        url = reverse("registro-detail", kwargs={"pk": registro.id})
        response = self.client.patch(url, data=data, format="multipart")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        registro.refresh_from_db()
        # Should have 2 files: 1 remaining initial file + 1 new file
        self.assertEqual(registro.remision.count(), 2)
        # Verify the deleted file is gone
        self.assertEqual(Archivo.objects.filter(id=initial_files[0].id).count(), 0)


class ArchivoViewSetTest(BaseTestCase):
    """
    Test cases for ArchivoViewSet.
    """

    def test_download_archivo(self):
        """
        Test downloading an Archivo instance.
        """
        test_file = SimpleUploadedFile("test_download.txt", b"test content", content_type="text/plain")
        archivo = Archivo.objects.create(archivo=test_file)
        url = reverse("archivo-download", kwargs={"pk": archivo.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response["Content-Disposition"].startswith('attachment; filename="test_download'))
        self.assertTrue(response["Content-Disposition"].endswith('.txt"'))

    def test_download_nonexistent_archivo(self):
        """
        Test downloading a non-existent Archivo instance.
        """
        url = reverse("archivo-download", kwargs={"pk": 99999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class EstudianteViewSetTest(BaseTestCase):
    """
    Test cases for EstudianteViewSet.
    """

    def test_create_estudiante(self):
        """
        Test creating an Estudiante instance.
        """
        url = reverse("estudiante-list")
        new_estudiante_data = {
            "nombreEstudiante": "New Test Student",
            "gradoEscolaridad": "Décimo",
            "tipoDocumentoEstudiante": "TI",
            "numeroDocumentoEstudiante": "987654321",
        }
        response = self.client.post(url, new_estudiante_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Estudiante.objects.count(), 2)

    def test_create_estudiante_with_files(self):
        """
        Test creating an Estudiante instance with file attachments.
        """
        url = reverse("estudiante-list")
        test_file = SimpleUploadedFile("test_file.txt", b"test content", content_type="text/plain")
        data = {
            **self.estudiante_data,
            "nombreEstudiante": "Another Test Student",
            "piar": [test_file],
        }
        response = self.client.post(url, data, format="multipart")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(Estudiante.objects.filter(nombreEstudiante="Another Test Student").exists())

    def test_list_estudiantes(self):
        """
        Test listing all Estudiante instances.
        """
        url = reverse("estudiante-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_estudiante(self):
        """
        Test updating an Estudiante instance.
        """
        url = reverse("estudiante-detail", kwargs={"pk": self.estudiante.id})
        updated_data = {**self.estudiante_data, "gradoEscolaridad": "Décimo"}
        response = self.client.put(url, updated_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.estudiante.refresh_from_db()
        self.assertEqual(self.estudiante.gradoEscolaridad, "Décimo")

    def test_update_estudiante_with_file_deletion(self):
        """Test updating an Estudiante instance with file deletion"""
        # Add some test files to estudiante
        files = self.create_test_files(3)
        for file in files:
            self.estudiante.piar.add(file)

        # Prepare update data with file deletion
        update_data = {"piar": {"eliminated": [files[0].id, files[1].id]}}

        url = reverse("estudiante-detail", kwargs={"pk": self.estudiante.id})
        response = self.client.patch(url, update_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.estudiante.refresh_from_db()
        self.assertEqual(self.estudiante.piar.count(), 1)
        self.assertEqual(Archivo.objects.filter(id__in=[f.id for f in files[:2]]).count(), 0)

    def test_update_estudiante_with_multiple_file_fields(self):
        """Test updating an Estudiante instance with multiple file field operations"""
        # Add initial files
        piar_files = self.create_test_files(2)
        compromiso_files = self.create_test_files(2)

        for file in piar_files:
            self.estudiante.piar.add(file)
        for file in compromiso_files:
            self.estudiante.compromisoPadres.add(file)

        # Prepare update data
        update_data = {
            "piar": {"eliminated": [piar_files[0].id]},
            "compromisoPadres": {"eliminated": [compromiso_files[0].id]},
        }

        url = reverse("estudiante-detail", kwargs={"pk": self.estudiante.id})
        response = self.client.patch(url, update_data, format="json")

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.estudiante.refresh_from_db()
        self.assertEqual(self.estudiante.piar.count(), 1)
        self.assertEqual(self.estudiante.compromisoPadres.count(), 1)
        self.assertEqual(Archivo.objects.filter(id__in=[piar_files[0].id, compromiso_files[0].id]).count(), 0)


class EstudiantePreviewViewSetTest(BaseTestCase):
    """
    Test cases for EstudiantePreviewViewSet.
    """

    def test_preview_estudiantes(self):
        """
        Test previewing Estudiante instances.
        """
        timezone_aware_datetime = datetime.now(pytz.UTC)
        Registro.objects.create(estudiante=self.estudiante, fecha=timezone_aware_datetime, estadoCaso="Abierto")

        url = reverse("estudiante-preview-preview")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["nombreEstudiante"], self.estudiante.nombreEstudiante)
        self.assertEqual(response.data[0]["estadoCaso"], "Abierto")
