import requests
import boto3
from botocore import UNSIGNED
from botocore.config import Config
import datetime
from netCDF4 import Dataset # https://github.com/Unidata/netcdf4-python
import json
import numpy as np
from geojson import Point, FeatureCollection, Feature, dumps
import os.path
from app.goes.goes2latlon import goes_to_latlon

product = "ABI-L2-FDCF"
s3 = boto3.client('s3', config=Config(signature_version=UNSIGNED))

def get_day_of_year(date):
  return date.timetuple().tm_yday

def get_s3_folder_prefix(date, hour):
  return product + "/" + str(date.year) + "/" + str(get_day_of_year(date)) + "/" + str(hour)

def get_s3_link(date_str, hour, bucket):
  date = datetime.datetime.strptime(date_str, "%m/%d/%Y")
  for key in s3.list_objects(Bucket=bucket, Prefix=get_s3_folder_prefix(date, hour))['Contents']:
      return key['Key']

def get_data(lat, lon, mask, channels):
  res = []
  for i in channels:
    for index, item in enumerate(mask):
      for data in np.where(mask[index] == i):
        if len(data) > 0:
          res.append((lat[index][data[0]], lon[index][data[0]]))
  return res

def lat_lon_to_geojson(coordinates):
  features = []
  for coord in coordinates:
    feature = Feature()
    feature.geometry = Point([float(coord[1]), float(coord[0])])
    features.append(feature)
  return FeatureCollection(features)

def getFireFromGoesByBucket(bucket, date, hour):
    channels = [10,11,12,13,14,15,30,31,32,33,34,35]
    filename = "tmp/" + bucket + date.replace("/","-") + hour
    if not os.path.isfile(filename + ".geojson"):
      s3.download_file(bucket, get_s3_link(date, hour, bucket), filename + ".nc")
      ds = Dataset(filename + ".nc", 'r')
      (lat, lon) = goes_to_latlon(ds)
      mask = ds.variables['Mask'][:]
      indian = get_data(lat, lon, mask, channels)
      ds.close()
      ds = None
      data = lat_lon_to_geojson(indian)
      os.remove(filename + ".nc")
      with open(filename + ".geojson", 'w') as outfile:
        json.dump(data, outfile)
    else:
      f = open(filename + ".geojson", "r")
      data = json.loads(f.read())
    return data

def getFireFromGoes():
  now = datetime.datetime.now(datetime.timezone.utc)
  date = now.strftime("%m/%d/%Y")
  hour = now.strftime("%H")
  goes16 = getFireFromGoesByBucket("noaa-goes16", date, hour)
  goes17 = getFireFromGoesByBucket("noaa-goes17", date, hour)
  return FeatureCollection(goes16.get("features") + goes17.get("features"))