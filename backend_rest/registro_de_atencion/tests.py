from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from .models import Registro


class RegistroViewSetTests(APITestCase):
    def setUp(self):
        # Create multiple registros for the same alumno
        Registro.objects.create(
            nombreEstudiante="Juan Perez",
            fecha="2023-01-01T10:00:00Z",
            gradoEscolaridad="5th Grade",
            posiblesMotivosDeAtencion="Motivo 1",
            tipoDeAtencion="Tipo 1",
            estadoCaso="Abierto",
        )
        Registro.objects.create(
            nombreEstudiante="Juan Perez",
            fecha="2023-02-01T10:00:00Z",
            gradoEscolaridad="5th Grade",
            posiblesMotivosDeAtencion="Motivo 2",
            tipoDeAtencion="Tipo 2",
            estadoCaso="Cerrado",
        )
        # Create registros for another alumno
        Registro.objects.create(
            nombreEstudiante="Maria Lopez",
            fecha="2023-03-01T10:00:00Z",
            gradoEscolaridad="6th Grade",
            posiblesMotivosDeAtencion="Motivo 3",
            tipoDeAtencion="Tipo 3",
            estadoCaso="En Proceso",
        )

    def test_latest_per_alumno_endpoint(self):
        url = reverse("registro-latest-per-alumno")
        response = self.client.get(url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        # Verify the latest Registro for "Juan Perez"
        juan = next(item for item in response.data if item["nombreEstudiante"] == "Juan Perez")
        self.assertEqual(juan["posiblesMotivosDeAtencion"], "Motivo 2")
        self.assertEqual(juan["tipoDeAtencion"], "Tipo 2")
        self.assertEqual(juan["estadoCaso"], "Cerrado")

        # Verify the Registro for "Maria Lopez"
        maria = next(item for item in response.data if item["nombreEstudiante"] == "Maria Lopez")
        self.assertEqual(maria["posiblesMotivosDeAtencion"], "Motivo 3")
        self.assertEqual(maria["tipoDeAtencion"], "Tipo 3")
        self.assertEqual(maria["estadoCaso"], "En Proceso")

    def test_all_registros_by_alumno_endpoint(self):
        url = reverse("registro-all-registros-by-alumno")
        response = self.client.get(url, {"nombreEstudiante": "Juan Perez"}, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)

        # Verify the registros for "Juan Perez"
        for registro in response.data:
            self.assertEqual(registro["nombreEstudiante"], "Juan Perez")
