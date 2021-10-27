import os
import re

from django.core.files import File
from django.core.management.base import BaseCommand

from app.models import Layer


DEFAULT_PUBLIC_LAYER_DIR = f"{os.path.dirname(__file__)}/default_public_layers"


def delete_all():
    Layer.objects.filter(is_default_public_layer=True).delete()


def create_layers(file):
    filename_with_extension = os.path.basename(file.name)
    filename = filename_with_extension.split(".")[0]
    description = f"Public layer: {filename}"
    layer = Layer(name=filename, description=description, is_public=True, is_default_public_layer=True)
    layer.source_file.save(filename_with_extension, file)


def is_geojson(name_file):
    name_file = name_file.lower()
    pattern = re.compile(r"\.geojson$")
    return bool(pattern.search(name_file))


class Command(BaseCommand):
    help = "Create layers publics from files geojson"

    def handle(self, *args, **options):
        files_gejson = [f_name for f_name in os.listdir(DEFAULT_PUBLIC_LAYER_DIR) if is_geojson(f_name)]
        delete_all()
        for filename in files_gejson:
            with open(os.path.join(DEFAULT_PUBLIC_LAYER_DIR, filename)) as f:
                file = File(f)
                create_layers(file)
