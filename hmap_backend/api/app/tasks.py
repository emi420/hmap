from django.core.files.base import ContentFile

import requests

from app.models import Layer
from celery import shared_task
from celery.utils.log import get_logger


logger = get_logger(__name__)
FIRMS_MODIS_URL = "https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_South_America_24h.csv"
FIRMS_VIIRS_URL = (
    "https://firms.modaps.eosdis.nasa.gov/data/active_fire/viirs/csv/VNP14IMGTDL_NRT_South_America_24h.csv"
)


def pull_layer_from_csv_service(url: str, layer_name: str) -> Layer:
    response = requests.get(url)
    csv_file = ContentFile(response.text, name="untitled.csv")
    layer = Layer.objects.get_or_create(name=layer_name, is_public=True)[0]
    layer.source_file = csv_file
    layer.save()
    return layer


@shared_task
def update_firms_modis():
    return pull_layer_from_csv_service(FIRMS_MODIS_URL, "Firms Modis")


@shared_task
def update_firms_viirs():
    pull_layer_from_csv_service(FIRMS_VIIRS_URL, "Firms Viirs")
