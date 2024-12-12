from datetime import datetime

from django.core.files.uploadedfile import SimpleUploadedFile
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Archivo, Estudiante, Registro


class BaseTestCase(APITestCase):
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


class RegistroViewSetTest(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.registro_data = {
            "estudiante": self.estudiante.id,
            "fecha": datetime.now().isoformat(),
            "remitidoPor": "Test Remitente",
            "posiblesMotivosDeAtencion": "Test Motivo",
            "lineaDeAtencion": "Test Linea",
            "tipoDeAtencion": "Test Tipo",
            "estadoCaso": "Abierto",
        }

    def test_create_registro(self):
        url = reverse("registro-list")
        response = self.client.post(url, self.registro_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Registro.objects.count(), 1)

    def test_get_registros_by_alumno(self):
        # Create a test registro
        Registro.objects.create(
            estudiante=self.estudiante, **{k: v for k, v in self.registro_data.items() if k != "estudiante"}
        )

        url = reverse("registro-all-registros-by-alumno", kwargs={"pk": self.estudiante.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class ArchivoViewSetTest(BaseTestCase):
    def test_download_archivo(self):
        """Test downloading an archivo"""
        test_file = SimpleUploadedFile("test_download.txt", b"test content", content_type="text/plain")
        archivo = Archivo.objects.create(archivo=test_file)
        url = reverse("archivo-download", kwargs={"pk": archivo.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response["Content-Disposition"].startswith('attachment; filename="test_download'))
        self.assertTrue(response["Content-Disposition"].endswith('.txt"'))

    def test_download_nonexistent_archivo(self):
        url = reverse("archivo-download", kwargs={"pk": 99999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)


class EstudianteViewSetTest(BaseTestCase):
    def test_create_estudiante(self):
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
        url = reverse("estudiante-list")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_update_estudiante(self):
        url = reverse("estudiante-detail", kwargs={"pk": self.estudiante.id})
        updated_data = {**self.estudiante_data, "gradoEscolaridad": "Décimo"}
        response = self.client.put(url, updated_data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.estudiante.refresh_from_db()
        self.assertEqual(self.estudiante.gradoEscolaridad, "Décimo")


class EstudiantePreviewViewSetTest(BaseTestCase):
    def test_preview_estudiantes(self):
        # Create a test registro
        Registro.objects.create(estudiante=self.estudiante, fecha=datetime.now(), estadoCaso="Abierto")

        url = reverse("estudiante-preview-preview")
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["nombreEstudiante"], self.estudiante.nombreEstudiante)
        self.assertEqual(response.data[0]["estadoCaso"], "Abierto")
