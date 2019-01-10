import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router,
  data: {
    mapObject: "",
    source: [43.614386, 7.071125],
    destination: [43.5696095, 7.1067697]
  },
  render: h => h(App)
}).$mount("#app");
