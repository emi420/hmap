from argparse import ArgumentParser

import geopandas as gp


parser = ArgumentParser()

parser.add_argument("-in", "--file-in", dest="file_in", help="Input file")

parser.add_argument("-out", "--quiet", dest="file_out", default="", help="Output file")

parser.add_argument("-layer", "--layer", dest="layer", help="Layer")

parser.add_argument("-driver", "--driver", dest="driver", help="Driver (GeoJSON)", default="GeoJSON")

args = parser.parse_args()
if args.file_in and args.file_out == "":
    args.file_out = args.file_in + ".geojson"


print("Reading file ...")
gdf = gp.read_file(args.file_in, layer=args.layer)
print("Saving ...")
gdf.to_file(args.file_out, driver=args.driver)
print("Done.")
