# Generated by Django 5.1.2 on 2024-12-06 20:17

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("registro_de_atencion", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="registro",
            name="estudiante_snapshot",
            field=models.JSONField(blank=True, null=True, verbose_name="Datos del estudiante al momento del registro"),
        ),
        migrations.AlterField(
            model_name="estudiante",
            name="nombreEstudiante",
            field=models.CharField(max_length=500, unique=True),
        ),
    ]
