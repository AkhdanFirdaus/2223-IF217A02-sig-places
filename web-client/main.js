import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import {OSM, Vector as VectorSource} from 'ol/source';
import GeoJSON from 'ol/format/GeoJSON';
import XYZ from 'ol/source/XYZ';

let placesLayer = new VectorLayer({
  source: new VectorSource(),
});

fetch('http://127.0.0.1:5173/assets/pariwisata_geojson.geojson')
  .then((response) => {
    return response.json();
  })
  .then((jsonResponse) => {
    placesLayer.setSource(
      new VectorSource({
        features: new GeoJSON().readFeatures(jsonResponse)
      })
    );
  });

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new XYZ({
        url: 'https://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}'
      }),
    }),
    new TileLayer({
      source: new OSM(),
    }),
    placesLayer,
  ],
  view: new View({
    projection: 'EPSG:4326',
    center: [107.55823133957851, -6.969551804745719],
    zoom: 13
  })
});
