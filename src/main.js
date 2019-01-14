import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { stringify, parse } from "flatted/cjs";

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
    if (localStorage.sourceLatLng) {
      this.source.latLng = parse(localStorage.sourceLatLng);
    }
    if (localStorage.destinationLatLng) {
      this.destination.latLng = parse(localStorage.destinationLatLng);
    }
    if (localStorage.sourceVerbose) {
      this.source.verbose = parse(localStorage.sourceVerbose);
    }
    if (localStorage.destinationVerbose) {
      this.destination.verbose = parse(localStorage.destinationVerbose);
    }
  },
  watch: {
    "source.latLng": function(val) {
      localStorage.sourceLatLng = stringify(val);
    },
    "destination.latLng": function(val) {
      localStorage.destinationLatLng = stringify(val);
    },
    "source.verbose": function(val) {
      localStorage.sourceVerbose = stringify(val);
    },
    "destination.verbose": function(val) {
      localStorage.destinationVerbose = stringify(val);
    }
  },
  render: h => h(App)
}).$mount("#app");
