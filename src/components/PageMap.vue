<template>
  <l-map
    ref="pageMap"
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
      zoom: 13,
      center: [43.57, 7.0689363],
      bounds: null
    };
  },
  mounted: function() {
    const map = this.$refs.pageMap.mapObject;

    L.Routing.control({
      waypoints: [L.latLng(57.74, 11.94), L.latLng(57.6792, 11.949)],
      router: L.Routing.mapbox(process.env.VUE_APP_API_KEY)
    }).addTo(map);
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
