import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { stringify, parse } from "flatted/esm";
import filterConsole from "filter-console";

// Vue and flatted collide, making a whole lot of this appear without any damage
filterConsole(['Property or method "toJSON" is not defined on the instance']);

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
    if (localStorage.home) {
      this.favorites.home = parse(localStorage.home);
    }
    if (localStorage.work) {
      this.favorites.work = parse(localStorage.work);
    }
    if (localStorage.school) {
      this.favorites.school = parse(localStorage.school);
    }
    if (localStorage.new) {
      this.favorites.new = parse(localStorage.new);
    }
    if (localStorage.showFavorites) {
      this.showFavorites = parse(localStorage.showFavorites);
    }
  },
  watch: {
    source(val) {
      localStorage.source = stringify(val);
    },
    destination(val) {
      localStorage.destination = stringify(val);
    },
    "favorites.home"(val) {
      localStorage.home = stringify(val);
    },
    "favorites.work"(val) {
      localStorage.work = stringify(val);
    },
    "favorites.school"(val) {
      localStorage.school = stringify(val);
    },
    "favorites.new"(val) {
      localStorage.new = stringify(val);
    },
    showFavorites(val) {
      localStorage.showFavorites = stringify(val);
    }
  },
  render: h => h(App)
}).$mount("#app");
