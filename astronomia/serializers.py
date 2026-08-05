from rest_framework import serializers
from .models import ObjetoAstronomico

class ObjetoAstronomicoSerializer(serializers.ModelSerializer):

    class Meta:
        model = ObjetoAstronomico
        fields = '__all__'
