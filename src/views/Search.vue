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
      <button @click="panAllResults">Go</button>
      <div v-if="error" class="container error">
        <p>
          Map options not available, as no API key was found. You can get a Mapbox API key here: https://www.mapbox.com/signup/.
          It's limited to a couple of thousand requests per day. When you have your key, make a file named `.env.local` at the root of the project,
          then add the following line to the file: `VUE_APP_API_KEY="INSERT YOUR KEY HERE"`
        </p>
      </div>
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
      destination: "",
      error: false
    };
  },
  mounted() {
    this.source = this.$root.$data.source.verbose;
    this.destination = this.$root.$data.destination.verbose;
  },
  methods: {
    async panToResult(location, isSource) {
      const map = this.$root.$data.map;
      if (process.env.VUE_APP_API_KEY == null) {
        this.error = true;
      }
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
    async panAllResults() {
      await this.panToResult(this.source, true);
      await this.panToResult(this.destination, false);
      this.$router.push("routes");
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
