# based on: https://github.com/miquel-vv/csv-to-geojson

from io import StringIO
from itertools import chain

from django.core.files import File

import numpy
import pandas

from geojson import Feature, FeatureCollection, Point, dumps


LAT_COLUMN_NAME = "lat"
LON_COLUMN_NAME = "lng"


def get_lat_lon_mapping():
    lat_names = ["lat", "Lat", "LAT", "latitude", "Latitude", "LATITUDE"]
    lon_names = ["lng", "Lng", "LNG", "lon", "Lon", "LON", "longitude", "Longitude", "LONGITUDE"]
    return dict(
        chain(
            zip(lat_names, [LAT_COLUMN_NAME] * len(lat_names)),
            zip(lon_names, [LON_COLUMN_NAME] * len(lon_names)),
        )
    )


def create_geojson(csv_file: File) -> StringIO:
    with csv_file.open() as f:
        df = pandas.read_csv(csv_file).fillna("").rename(columns=get_lat_lon_mapping())
    lat = df[LAT_COLUMN_NAME]
    lng = df[LON_COLUMN_NAME]
    df = df.drop(columns=[LAT_COLUMN_NAME, LON_COLUMN_NAME])

    feat_list = []
    failed = []
    for i in range(0, len(df.index)):
        props = remove_np_from_dict(dict(df.loc[i]))
        try:
            f = Feature(geometry=Point((float(lng[i]), float(lat[i]))), properties=props)
            feat_list.append(f)
        except ValueError:
            failed.append(props)

    collection = FeatureCollection(feat_list)
    output_geojson = StringIO(dumps(collection))

    return output_geojson


def remove_np_from_dict(d):
    """numpy int64 objects are not serializable so need to convert values first."""
    new = {}
    for key, value in d.items():
        if isinstance(key, numpy.int64):
            key = int(key)
        if isinstance(value, numpy.int64):
            value = int(value)
        new[key] = value
    return new


def convert_numpy(val):
    if isinstance(val, numpy.int64):
        return int(val)
