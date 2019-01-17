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
  mounted() {
    const mapObject = this.$refs.pageMap.mapObject;
    mapObject.zoomControl.remove();
    this.$root.$data.map = mapObject;

    ["home", "work", "school", "new"].forEach(fav => {
      this.initializeMark(this.$root.$data.favorites[fav]);
    });
    ["source", "destination"].forEach(target =>
      this.initializeMark(this.$root.$data[target])
    );
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
    },
    initializeMark(obj) {
      const map = this.$refs.pageMap.mapObject;
      if (Object.keys(obj.latLng).length !== 0) {
        map.panTo(obj.latLng);
        const mark = L.marker(obj.latLng, {
          title: obj.verbose
        });
        mark.addTo(map);
        obj.mark = mark;
      }
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

.routing-itinerary-hidden {
  display: none;
}

@media only screen and (max-width: 500px) {
  .vue2leaflet-map {
    box-sizing: border-box;
    top: 0;
    min-height: 50vh;
    height: 100% !important;
  }
}
</style>
