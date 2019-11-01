# Humanitarian Map

Easy-to-use humanitarian map for work before, during and after events.

### Install

```
$ git clone https://github.com/emi420/hmap.git
$ cd hmap
$ npm install
```

### Configure

* Rename `src/config/config.sample.js` to `config.js` and edit this file adding a `MAPBOX_ACCESS_TOKEN`.
* Change map center `MAP_DEFAULT_CENTER`
* Change `data/*.geojson` and/or `config/layers` with your own data and styles.
* Also, you can change the map's style, changing `MAPBOX_DEFAULT_STYLE` , for example I'm using mya custom style `mapbox://styles/emi420/ck2divmvv1gip1cpjxumqy761`.
* If you want to change the CSV sources for FIRMS data, change `MODIS_24_URL` and `VIIRS_24_URL` and use your own, for example you can load `https://firms.modaps.eosdis.nasa.gov/data/active_fire/c6/csv/MODIS_C6_South_America_24h.csv` through a proxy.

### Run

```
$ npm run start
```

Then load http://localhost:3000 in your browser.

### Build

```
$ npm run build
```

### Deploy

1. Rename `deploy-sample.sh` to `deploy.sh` and edit `<user>`, `<ip>` and `<project-folder>` with your server username, host and project folder.
2. Run deploy script

```
$ sh ./deploy.sh
```

### Live demo

https://bomberoslagranja.org/mapa/