<template>
  <l-map
    ref="pageMap"
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
  </l-map>
</template>

<script>
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import Vue2Leaflet from "vue2-leaflet";

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [13, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export default {
  components: {
    "l-map": Vue2Leaflet.LMap,
    "l-tile-layer": Vue2Leaflet.LTileLayer
  },
  data() {
    return {
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      attribution:
        "Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL.",
      zoom: 13,
      center: [43.588, 7.0689363],
      bounds: null
    };
  },
  mounted: function() {
    const map = this.$refs.pageMap.mapObject;
    this.$root.$data.mapObject = map;
    L.control;
    /*
    L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      router: L.Routing.mapbox(process.env.VUE_APP_API_KEY),
      lineOptions: {
        addWaypoints: false
      }
    }).addTo(map);
    */
    L.marker(this.$root.$data.source).addTo(map);
    L.marker(this.$root.$data.destination).addTo(map);
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

<style lang="scss">
@import "@/common/constants.scss";

.vue2leaflet-map {
  top: $headerHeight;
  width: 100%;
  height: calc(100% - #{$headerHeight}) !important;
}

.leaflet-control-container {
  display: none;
}

@media only screen and (max-width: 500px) {
  .vue2leaflet-map {
    top: 0;
    z-index: -1;
    height: 50vh !important;
  }
}
</style>
