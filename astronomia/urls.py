from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (ObjetoAstronomicoViewSet,
                    CatalogoTipoObjetoViewSet,
                    EstadisticasAPIView
)
from .views import ObjetoAstronomicoViewSet, EstadisticasAPIView

router = DefaultRouter()

router.register(
    r'objects', ObjetoAstronomicoViewSet)

router.register(
    r'catalog',
    CatalogoTipoObjetoViewSet, basename='catalog')

urlpatterns = [
    path(
        'statistics/',
EstadisticasAPIView.as_view(),name='statistics'),
     path("statics/", EstadisticasAPIView.as_view(),
          name = "statics"), 

    path('', include (router.urls)),
]

