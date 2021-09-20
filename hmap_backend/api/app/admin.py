from django.contrib import admin

from app.models import Layer


class LayerAdmin(admin.ModelAdmin):
    exclude = ["geojson_data"]


admin.site.register(Layer, LayerAdmin)
