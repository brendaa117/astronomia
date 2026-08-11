from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ObjetoAstronomicoViewSet, EstadisticasAPIView

router = DefaultRouter()

router.register(
    r'objects', ObjetoAstronomicoViewSet)

urlpatterns = [
     path("statics/", EstadisticasAPIView.as_view(),
          name = "statics"), 

    path('', include (router.urls)),
]

