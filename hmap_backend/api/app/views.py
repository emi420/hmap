from django.http import HttpResponse, JsonResponse

from rest_framework import permissions, viewsets

import requests

from app.goes.goes import getFireFromGoes
from app.models import Layer
from app.serializers import LayerSerializer
from guardian.shortcuts import get_objects_for_user


def getFirmsModis(request):
    modis_url = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/modis-c6.1/csv/MODIS_C6_1_South_America_24h.csv"
    r = requests.get(modis_url)
    return HttpResponse(r.text)


def getFirmsViirs(request):
    viirs_url = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/suomi-npp-viirs-c2/csv/SUOMI_VIIRS_C2_South_America_24h.csv"
    r = requests.get(viirs_url)
    return HttpResponse(r.text)


def getGoes(request):
    r = getFireFromGoes()
    return JsonResponse(r)


class LayerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = LayerSerializer
    pagination_class = None

    def get_queryset(self):
        return get_objects_for_user(self.request.user, "app.view_layer") | Layer.objects.filter(is_public=True)
