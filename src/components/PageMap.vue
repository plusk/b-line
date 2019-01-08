<template>
  <l-map
    style="height: calc(100vh - 75px); width: 100%; top: 75px"
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>
import "leaflet/dist/leaflet.css";
import Vue2Leaflet from "vue2-leaflet";

export default {
  components: {
    "l-map": Vue2Leaflet.LMap,
    "l-tile-layer": Vue2Leaflet.LTileLayer
  },
  data() {
    return {
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [43.57, 7.0689363],
      bounds: null
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    }
  }
};
</script>
