import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { stringify, parse } from "flatted/esm";

Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    mapObject: "",
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
    favorites: {}
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
