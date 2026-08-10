from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (ObjetoAstronomicoViewSet,
                    CatalogoTipoObjetoViewSet,
                    EstadisticasAPIView
)
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
    path('', include (router.urls)),
]