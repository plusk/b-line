<template>
  <div class="wrapper">
    <div class="container">
      <h2>Search</h2>
      <input type="search" placeholder="Where from?" v-model="source" @keyup.enter="setSource">
      <input
        type="search"
        placeholder="Where to?"
        v-model="destination"
        @keyup.enter="setDestination"
      >
      <router-link to="/routes">
        <button>Go</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import L from "leaflet";

export default {
  data() {
    return {
      source: "",
      destination: ""
    };
  },
  mounted() {
    this.source = this.$root.$data.source.verbose;
    this.destination = this.$root.$data.destination.verbose;
  },
  methods: {
    setSource() {
      this.panToResult(this.source, true);
      this.$root.$data.source.verbose = this.source;
    },
    setDestination() {
      this.panToResult(this.destination, false);
      this.$root.$data.destination.verbose = this.destination;
    },
    panToResult(location, isSource) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${
          process.env.VUE_APP_API_KEY
        }`
      )
        .then(response => response.json())
        .then(result => {
          const latLng = new L.LatLng(
            result.features[0].center[1],
            result.features[0].center[0]
          );
          this.$root.$data.mapObject.panTo(latLng);
          const mark = L.marker(latLng);
          mark.addTo(this.$root.$data.mapObject);
          if (isSource) {
            this.$root.$data.source.latLng = latLng;
            this.$root.$data.source.mark = mark;
          } else {
            this.$root.$data.destination.latLng = latLng;
            this.$root.$data.destination.mark = mark;
          }
        });
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/common/constants.scss";
@import "@/common/card.scss";

.wrapper {
  @extend %card;
  top: $headerHeight;
  transform: translateX(-50%);

  @media only screen and (max-width: 500px) {
    transform: none;
  }
}
</style>
