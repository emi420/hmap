from django.shortcuts import render

# Create your views here.

from django.http import HttpResponse, JsonResponse
import datetime
import requests
from app.goes.goes import getFireFromGoes

def getFirmsModis(request):
    modis_url = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_South_America_24h.csv"
    r = requests.get(modis_url)
    return HttpResponse(r.text)

def getFirmsViirs(request):
    viirs_url = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/viirs/csv/VNP14IMGTDL_NRT_South_America_24h.csv"
    r = requests.get(viirs_url)
    return HttpResponse(r.text)

def getGoes(request):
    r = getFireFromGoes()
    return JsonResponse(r)
    