<template>
  <div class="FavoriteField">
    <img v-bind:src="icon" v-bind:alt="name">
    <input
      type="text"
      v-model="verbose"
      v-bind:placeholder="name + ' address'"
      @change="sendData"
      @keyup.enter="setFavorite"
    >
  </div>
</template>

<script>
import L from "leaflet";

export default {
  props: {
    name: String,
    icon: String,
    value: String,
    updateData: Function
  },
  data() {
    return {
      verbose: this.value
    };
  },
  methods: {
    sendData() {
      this.updateData(this.name, this.verbose)
    },
    setFavorite() {
      const vm = this;
      const { map, favorites } = vm.$root.$data;
      const mark = favorites[vm.name].mark;

      if (Object.keys(mark).length !== 0) {
        map.removeLayer(mark);
      }

      this.geocodeLookup(vm.verbose, vm.name).then(({ latLng, mark }) => {
        favorites[vm.name] = {
          verbose: vm.verbose,
          latLng,
          mark
        };
      });
    },
    geocodeLookup(location, name) {
      const { map, showFavorites } = this.$root.$data;
      return fetch(
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
          const mark = L.marker(latLng, {
            title: name
          });
          if (showFavorites) {
            mark.addTo(map);
            map.panTo(latLng);
          }
          return {
            latLng,
            mark
          };
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.FavoriteField {
  display: flex;
  align-items: center;

  input {
    margin-left: 10px;
  }

  input::placeholder {
    text-transform: capitalize;
  }
  img {
    height: 30px;
    align-self: flex-end;
  }
}
</style>
