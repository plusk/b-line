<template>
  <div class="wrapper">
    <div class="container">
      <input type="search" placeholder="Where from?" v-model="source" @keyup.enter="setSource">
      <input type="search" placeholder="Where to?" v-model="this.$root.$data.destination">
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      source: ""
    };
  },
  methods: {
    setSource() {
      this.panToResult(this.source);
      this.$root.$data.source = this.source;
    },
    panToResult(location) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${
          process.env.VUE_APP_API_KEY
        }`
      )
        .then(response => response.json())
        .then(result => {
          const lat = result.features[0].center[1];
          const lng = result.features[0].center[0];
          this.$root.$data.mapObject.panTo(new L.LatLng(lat, lng));
        });
    }
  },
  mounted: function() {
    this.source = this.$root.$data.destination;
  }
};
</script>


<style lang="scss" scoped>
@import "@/common/constants.scss";

.wrapper {
  position: absolute;
  z-index: 1000;
  top: $pageHeaderHeight;
  left: 50%;
  transform: translateX(-50%);
  max-width: 500px;
  min-width: 250px;
  width: 100%;
  height: $searchHeight;
  padding: 100px 10px;
  box-sizing: border-box;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background: white;
  height: 100%;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

@media only screen and (max-width: 500px) {
  .wrapper {
    top: 50px;
    padding: 0;
  }
}
</style>
