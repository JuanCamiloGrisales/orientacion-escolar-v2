# Generated by Django 5.1.2 on 2024-12-21 18:58

from django.db import migrations


class Migration(migrations.Migration):
    dependencies = [
        ("registro_de_atencion", "0002_registro_estudiante_snapshot_and_more"),
    ]

    operations = [
        migrations.RenameField(
            model_name="registro",
            old_name="espectativasEntrevistado",
            new_name="expectativasEntrevistado",
        ),
    ]
