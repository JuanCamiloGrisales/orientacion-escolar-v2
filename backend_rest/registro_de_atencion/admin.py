from django.contrib import admin

from .models import Archivo, Registro

# Register your models here.
admin.site.register([Registro])
admin.site.register([Archivo])
