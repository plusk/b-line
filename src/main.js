import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    mapObject: "",
    source: {
      verbose: "",
      latLng: [],
      mark: {}
    },
    destination: {
      verbose: "",
      latLng: [],
      mark: {}
    }
  },
  render: h => h(App)
}).$mount("#app");
