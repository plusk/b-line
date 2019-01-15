import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { stringify, parse } from "flatted/esm";

Vue.config.productionTip = false;

const favorites = {};
const favoriteNames = ["home", "work", "school", "new"];
favoriteNames.forEach(name => {
  favorites[name] = {
    verbose: "",
    latLng: {},
    mark: {}
  };
});

new Vue({
  router,
  data: {
    map: "",
    source: {
      verbose: "",
      latLng: {},
      mark: {}
    },
    destination: {
      verbose: "",
      latLng: {},
      mark: {}
    },
    favorites,
    showFavorites: false
  },
  beforeMount() {
    if (localStorage.source) {
      this.source = parse(localStorage.source);
    }
    if (localStorage.destination) {
      this.destination = parse(localStorage.destination);
    }
  },
  watch: {
    source(val) {
      localStorage.source = stringify(val);
    },
    destination(val) {
      localStorage.destination = stringify(val);
    }
  },
  render: h => h(App)
}).$mount("#app");
