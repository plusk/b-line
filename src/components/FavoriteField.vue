<template>
  <div class="FavoriteField">
    <img v-bind:src="icon" v-bind:alt="name">
    <input
      type="text"
      v-model="verbose"
      v-bind:placeholder="name + ' address'"
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
    value: String
  },
  data() {
    return {
      verbose: this.value
    };
  },
  methods: {
    setFavorite() {
      const favorites = this.$root.$data.favorites;
      const vm = this;
      if (!(vm.name in favorites)) {
        this.geocodeLookup(vm.verbose, vm.name).then(({ latLng, mark }) => {
          vm.$set(favorites, vm.name, {
            verbose: vm.verbose,
            latLng,
            mark
          });
        });
      } else {
        this.$root.$data.mapObject.removeLayer(favorites[vm.name].mark);
        this.geocodeLookup(vm.verbose, vm.name).then(({ latLng, mark }) => {
          favorites[vm.name] = {
            verbose: vm.verbose,
            latLng,
            mark
          };
        });
      }
    },
    geocodeLookup(location, name) {
      const map = this.$root.$data.mapObject;
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
          map.panTo(latLng);
          const mark = L.marker(latLng, {
            title: name
          });
          if (this.$root.$data.showFavorites) {
            mark.addTo(map);
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
