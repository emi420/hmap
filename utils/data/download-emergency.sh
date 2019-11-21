# [out:json];

# area[name="Argentina"]->.b;
# rel(area.b)[name="Córdoba"];
# map_to_area -> .a;

# node["emergency"](area.a);
# (._;>;);
# out;

wget -O emergency.geojson "http://overpass-api.de/api/interpreter?data=[out:osm];area[name=\"Argentina\"]->.b;rel(area.b)[name=\"Córdoba\"];map_to_area -> .a;node[\"emergency\"](area.a);(._;>;);out;"



