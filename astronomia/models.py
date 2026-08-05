from datetime import date
from django.db import models

class ObjetoAstronomico(models.Model):
# definir una lista de opciones válidas para un campo de modelo, no te preocupes por mi aki todo siguie igual-...

    TIPO_CHOICES = [
        ('ESTRELLA', 'Estrella'),
        ('PLANETA', 'Planeta'),
        ('GALAXIA', 'Galaxia'),
        ('NEBULOSA', 'Nebulosa'),
        ('ASTEROIDE', 'Asteroide'),
        ('COMETA', 'Cometa'),
    ]

    nombre = models.CharField(max_length=100)

    tipo = models.CharField(max_length=20,
        choices=TIPO_CHOICES)

    descripcion = models.CharField(max_length=200)

    constelacion = models.CharField(max_length=100)

    fecha_descubrimiento = models.DateField(default=date.today )

    creado_en = models.DateTimeField(auto_now_add=True)

    actualizado_en = models.DateTimeField(auto_now=True )

    def __str__(self):
        return self.nombre
