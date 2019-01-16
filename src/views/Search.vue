<template>
  <div class="wrapper">
    <error-container></error-container>
    <div class="container">
      <button id="speech" class="speech-button" @click="speech">
        <img src="../assets/sound.svg">
      </button>
      <h2>Search</h2>
      <input
        type="search"
        placeholder="Where from?"
        v-model="source"
        @keyup.enter="panToResult(source, true)"
      >
      <input
        type="search"
        placeholder="Where to?"
        v-model="destination"
        @keyup.enter="panToResult(destination, false)"
      >
      <router-link to="/routes">
        <button>Go</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import L from "leaflet";

import ErrorContainer from "@/components/ErrorContainer.vue";

export default {
  components: {
    ErrorContainer
  },
  data() {
    return {
      source: "",
      destination: ""
    };
  },
  mounted() {
    this.source = this.$root.$data.source.verbose;
    this.destination = this.$root.$data.destination.verbose;
  },
  methods: {
    panToResult(location, isSource) {
      const map = this.$root.$data.map;
      fetch(
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
          const mark = L.marker(latLng);
          mark.addTo(map);

          let target;
          if (isSource) {
            target = "source";
          } else {
            target = "destination";
          }

          const oldMark = this.$root.$data[target].mark;
          if (Object.keys(oldMark).length !== 0) {
            map.removeLayer(oldMark);
          }
          this.$root.$data[target] = {
            verbose: this[target],
            latLng,
            mark
          };
        });
    },
    speech() {
      if ("speechSynthesis" in window) {
        var synth = window.speechSynthesis;
        var msg = "From " + this.source + " to " + this.destination;
        var voices = synth.getVoices();
        var utterance = new SpeechSynthesisUtterance(msg);
        utterance.voice = voices[1];

        synth.speak(utterance);
      }
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

  @media only screen and (max-width: 500px) {
    transform: none;
  }
}

.speech-button {
  background: white;
  align-self: flex-end;
}
</style>
