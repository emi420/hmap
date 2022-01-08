# Humanitarian Map

Easy-to-use humanitarian map for work before, during and after events.

### Backend 

To start with the backend configuration, see: [Readme backend](hmap_backend/README.md)
Below are the instructions to run, build and deploy the front-end web-app.

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
* Also, you can change the map's style, changing `MAPBOX_DEFAULT_STYLE` , for example I'm using my own custom style `mapbox://styles/emi420/ck2divmvv1gip1cpjxumqy761`.

### Run

```
$ npm run start
```

Then load http://localhost:3000 in your browser.

### Build

```
$ npm run build
```

### License

You may use this project under the terms of either the MIT License or the GNU General Public License (GPL) Version 3.

(c) 2019 Emilio Mariscal
