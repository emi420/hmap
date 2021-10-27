import os

from django.core.validators import FileExtensionValidator
from django.db import models


class Layer(models.Model):

    name = models.TextField(null=False, blank=False)
    description = models.TextField(null=True, blank=True)
    geojson_data = models.FileField(
        upload_to="layers_geojson/", null=True, validators=[FileExtensionValidator(["geojson"])]
    )
    source_file = models.FileField(
        upload_to="layer_source_files", validators=[FileExtensionValidator(["csv", "geojson", "kml"])]
    )
    styles = models.JSONField(null=True, blank=True)
    is_public = models.BooleanField(default=False)
    is_default_public_layer = models.BooleanField(null=True, blank=True, default=False)
    # created_by = models.ForeignKey(UserAccount, null=True, on_delete=models.DO_NOTHING)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._source_file_name = "" if not self.source_file else self.source_file.name

    def __str__(self):
        return self.name

    def save_geojson_data_from_source_file(self):
        if self._source_file_name == self.source_file.name:
            return
        name, extension = os.path.splitext(self.source_file.name)
        name = name.split("/")[-1]
        extension = extension.lower()
        if extension == ".geojson":
            file = self.source_file.file
        if self.geojson_data:
            self.geojson_data.delete(save=False)
        self.geojson_data.save(f"{name}.geojson", file, save=False)

    def save(self, *args, **kwargs):
        self.save_geojson_data_from_source_file()
        super().save(*args, **kwargs)
