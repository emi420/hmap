# area[name="Argentina"]->.b;
# rel(area.b)[name="Córdoba"];
# map_to_area -> .a;

# (way["landuse"="landfill"](area.a);
# way["landuse"="waste"](area.a););
# (._;>;);
# out;

wget -O landfills.geojson "http://overpass-api.de/api/interpreter?data=[out:json];area[name=\"Argentina\"]->.b;rel(area.b)[name=\"Córdoba\"];map_to_area -> .a;(way[\"landuse\"=\"landfill\"](area.a);way[\"landuse\"=\"waste\"](area.a););(._;>;);out;"
