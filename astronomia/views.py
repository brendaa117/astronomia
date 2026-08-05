from rest_framework import viewsets

from .models import ObjetoAstronomico
from .serializers import ObjetoAstronomicoSerializer

class ObjetoAstronomicoViewSet(viewsets.ModelViewSet):

    queryset = ObjetoAstronomico.objects.all()
    serializer_class = ObjetoAstronomicoSerializer

#modelviews set sirve para tener predeterminadas acciones de un crud
