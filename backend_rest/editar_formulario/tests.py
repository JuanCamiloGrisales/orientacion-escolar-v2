import os

from django.core.files.uploadedfile import SimpleUploadedFile
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import EditarCampos


class EditarCamposAPITest(APITestCase):
    def setUp(self):
        self.url = reverse("editarcampos")
        self.editarcampos = EditarCampos.objects.create()

    def test_get_editarcampos(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_editarcampos(self):
        data = {"municipioDefault": "Nuevo Municipio", "municipioOpciones": ["Opción1", "Opción2"]}
        response = self.client.put(self.url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class UploadMunicipiosViewTest(APITestCase):
    def setUp(self):
        self.url = reverse("upload_municipios")
        self.file = SimpleUploadedFile("municipios.csv", b"municipio1,municipio2")

    def test_upload_municipios(self):
        response = self.client.post(self.url, {"file": self.file})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Municipios updated successfully.", response.data["detail"])

    def test_upload_municipios_no_file(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("No file provided.", response.data["detail"])


class EstudiantesUploadTest(TestCase):
    def setUp(self):
        self.url = reverse("upload_estudiantes")
        file_path = os.path.join(os.path.dirname(__file__), "test_files", "estudiantes.xlsx")
        self.file = open(file_path, "rb")

    def tearDown(self):
        self.file.close()

    def test_upload_estudiantes(self):
        response = self.client.post(self.url, {"file": self.file})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("Estudiantes updated successfully.", response.data["detail"])

    def test_upload_estudiantes_no_file(self):
        response = self.client.post(self.url)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("No file provided.", response.data["detail"])
