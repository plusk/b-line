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
  data: function() {
    return {
      source: "",
      destination: ""
    };
  },
  methods: {
    setSource() {
      this.panToResult(this.source);
      this.$root.$data.source = this.source;
    },
    setDestination() {
      this.panToResult(this.destination);
      this.$root.$data.destination = this.destination;
    },
    panToResult(location) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${
          process.env.VUE_APP_API_KEY
        }`
      )
        .then(response => response.json())
        .then(result => {
          const latlng = new L.LatLng(
            result.features[0].center[1],
            result.features[0].center[0]
          );
          this.$root.$data.mapObject.panTo(latlng);
          L.marker(latlng).addTo(this.$root.$data.mapObject);
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
}
</style>
