from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ObjetoAstronomicoViewSet

router = DefaultRouter()

router.register(
    r'objects', ObjetoAstronomicoViewSet)

urlpatterns = [
    path('', include (router.urls)),
]