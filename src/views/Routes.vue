<template>
  <div class="wrapper">
    <div v-for="route in routes" :key="route.id" class="container">
      <p>{{source}}</p>
      <img class="logo" src="../assets/bus.svg" alt="logo">
      <p>{{destination}}</p>
      <p>{{route.from}}</p>
      <p>{{route.duration}}</p>
      <p>{{route.to}}</p>
    </div>
    <div v-if="routes.length === 0" class="container error">
      <p>No routes found between {{source}} and {{destination}}. If these locations are on different continents, the issue may be that our buses cannot cross oceans.</p>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import { format, addSeconds, distanceInWords } from "date-fns";

export default {
  data: function() {
    return {
      source: "",
      destination: "",
      routes: []
    };
  },
  mounted: function() {
    const map = this.$root.$data.mapObject;

    this.source = this.$root.$data.source.verbose;
    this.destination = this.$root.$data.destination.verbose;

    const vm = this;

    L.Routing.control({
      waypoints: [
        this.$root.$data.source.latLng,
        this.$root.$data.destination.latLng
      ],
      router: L.Routing.mapbox(process.env.VUE_APP_API_KEY),
      lineOptions: {
        addWaypoints: false,
        styles: [
          { color: "black", opacity: 0.15, weight: 9 },
          { color: "white", opacity: 0.8, weight: 6 },
          { color: "orange", opacity: 1, weight: 2 }
        ]
      },
      showAlternatives: true,
      altLineOptions: {
        styles: [
          { color: "gray", opacity: 0.15, weight: 9 },
          { color: "white", opacity: 0.8, weight: 6 },
          { color: "gold", opacity: 0.5, weight: 2 }
        ]
      }
    })
      .addTo(map)
      .on("routesfound", function(e) {
        const now = new Date();
        vm.routes = e.routes.map((route, index) => ({
          id: index,
          from: format(now, "HH:mm"),
          to: format(addSeconds(now, route.summary.totalTime), "HH:mm"),
          duration: distanceInWords(
            now,
            addSeconds(now, route.summary.totalTime)
          )
        }));
      });
    const markers = new L.featureGroup([
      this.$root.$data.source.mark,
      this.$root.$data.destination.mark
    ]);
    map.fitBounds(markers.getBounds().pad(0.25));
  }
};
</script>


<style lang="scss" scoped>
@import "@/common/palette.scss";
@import "@/common/constants.scss";
@import "@/common/card.scss";

.wrapper {
  @extend %card;
  top: $headerHeight;
  transform: translateX(-50%);

  .container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    text-align: center;
    grid-gap: 5px;

    & > * + * {
      margin: 0;
    }

    img {
      height: 30px;
      margin: 0 auto;
    }

    &.error {
      display: block;
      color: red;
    }
  }

  .highlighted {
    outline: 2px solid $accent;
  }

  @media only screen and (max-width: 500px) {
    transform: none;

    .container {
      height: auto;
      padding: 15px;
    }
  }
}

.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
