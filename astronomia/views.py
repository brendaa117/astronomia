from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import ObjetoAstronomico
from .serializers import ObjetoAstronomicoSerializer
from django_filters.rest_framework import DjangoFilterBackend

#modelviews set sirve para tener predeterminadas acciones de un crud
#modelviews set sirve para tener predeterminadas las acciones de un crud
class ObjetoAstronomicoViewSet(viewsets.ModelViewSet):

    queryset = ObjetoAstronomico.objects.all()
    serializer_class = ObjetoAstronomicoSerializer

# procesa https, sirve para aplicar filtros de autenticacion antes 
# de ejecutar codigo pos aca juan este nomas cuenta los registros y a cuales tipos pertenecen y obtiene todos los obkjetos de BD
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['tipo', 'constelacion',]

# procesa https, sirve para aplicar filtros de autenticacion antes 
# de ejecutar codigo pos aca juan este nomas cuenta los registros
#  y a cuales tipos pertenecen y obtiene todos los obkjetos de BD. permite controlar los metodos HTTP
class EstadisticasAPIView(APIView):
    def get(self, request ):

        objects = ObjetoAstronomico.objects.all()

        total = objects.count()

        estrellas = objects.filter(tipo='ESTRELLA').count()

        planetas = objects.filter(tipo='PLANETAS').count()

        galaxias = objects.filter(tipo='GALAXIAS').count()

        nebulosas = objects.filter(tipo='NEBULOSAS').count()

        cometas = objects.filter(tipo='COMETAS').count()

        asteroides = objects.filter(tipo='ASTEROIDES').count()

        return Response({
                "total_objetos": total,
                "estrellas": estrellas,
                "planetas": planetas,
                "galaxias": galaxias,
                "nebulosas": nebulosas,
                "cometas": cometas,
                "asteroides": asteroides
            })
            })
#sin estar directamente a un modelo como model view este permite agrupar acciones
class CatalogoTipoObjetoViewSet(viewsets.ViewSet):

    def list(self, request):

        tipos = [
            {
                "codigo": codigo,
                "nombre": nombre
            }
            for codigo, nombre in 
            ObjetoAstronomico.TIPO_CHOICES
        ]
        return Response(tipos)
        return Response(tipos)

    
