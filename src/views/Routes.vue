<template>
  <div :class="{ wrapper: true, choiceMade }">
    <error-container>
      <p
        v-if="error"
      >No routes found between {{$root.$data.source.verbose}} and {{$root.$data.destination.verbose}}. If these locations are on different continents, the issue may be that our buses cannot cross oceans.</p>
    </error-container>
    <div v-if="!error && routes.length === 0" class="container loader">
      <div class="spinner"></div>
    </div>
    <route
      v-for="route in listedRoutes"
      :key="route.id"
      :route="route"
      :selected="selected"
      :choiceMade="choiceMade"
      :selectRoute="selectRoute"
      :toggleChoice="toggleChoice"
      :selectedCollapsed="selectedCollapsed"
    ></route>
    <button class="back" @click="goBack">&#60;</button>
  </div>
</template>

<script>
import L from "leaflet";
import { format, addSeconds, distanceInWords } from "date-fns";

import ErrorContainer from "@/components/ErrorContainer.vue";
import Route from "@/components/Route.vue";

export default {
  components: {
    ErrorContainer,
    Route
  },
  data() {
    return {
      error: false,
      routes: [],
      selected: 0,
      selectedCollapsed: true,
      choiceMade: false,
      control: {},
      query: {source: this.$root.$data.source.verbose, destination: this.$root.$data.destination.verbose}
    };
  },
  computed: {
    listedRoutes() {
      return this.routes.filter(
        route => !this.choiceMade || route.id === this.selected
      );
    }
  },
  methods: {
    selectRoute(id) {
      if (id === this.selected && !this.choiceMade) {
        this.selectedCollapsed = !this.selectedCollapsed;
      } else {
        this.selected = id;
        this.selectedCollapsed = false;
        const selectedRoute = this.control._alternatives.find(
          alt => alt._route.routesIndex === id
        );
        if (selectedRoute) {
          selectedRoute.fire("linetouched");
        }
      }
    },
    toggleChoice(e) {
      e.stopPropagation();
      this.choiceMade = !this.choiceMade;
      this.fitRoute(0);
    },
    fitRoute(padding) {
      const { map, source, destination } = this.$root.$data;
      const markers = new L.featureGroup([source.mark, destination.mark]);
      map.fitBounds(markers.getBounds().pad(padding));
    },
    goBack(e) {
      if (this.choiceMade) {
        this.toggleChoice(e);
      } else {
        history.back();
        this.$router.go(-1);
      }
    }
  },
  mounted() {
    this.$router.push({
      name: "routes",
      path: "/routes",
      query: this.query });

    const { map, source, destination } = this.$root.$data;

    const vm = this;

    vm.control = L.Routing.control({
      waypoints: [source.latLng, destination.latLng],
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
      },
      containerClassName: "routing-itinerary-hidden"
    })
      .addTo(map)
      .on("routesfound", e => {
        const now = new Date();
        vm.routes = e.routes.map(route => {
          let pointTime = now;
          return {
            id: route.routesIndex,
            from: format(now, "HH:mm"),
            to: format(addSeconds(now, route.summary.totalTime), "HH:mm"),
            duration: distanceInWords(
              now,
              addSeconds(now, route.summary.totalTime)
            ),
            instructions: route.instructions.map(point => {
              pointTime = addSeconds(pointTime, point.time);
              return {
                road: point.road,
                time: point.road ? format(pointTime, "HH:mm") : null
              };
            })
          };
        });
        vm.error = false;
      })
      .on("routeselected", e => {
        vm.selected = e.route.routesIndex;
      })
      .on("routingerror", () => {
        vm.error = true;
      });
    this.fitRoute(0.25);
  },
  destroyed() {
    this.control.remove();
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
    transition: box-shadow 0.15s;

    & > * + * {
      margin: 0;
    }

    &.loader {
      display: block;

      .spinner {
        border: 8px solid $light;
        border-top: 8px solid transparentize($accent, 0.25);
        border-radius: 50%;
        margin: 0 auto;
        width: 75px;
        height: 75px;
        animation: spin 2s linear infinite;
      }
    }

    &:not(.loader):not(.error):not(.expanded):hover {
      cursor: pointer;
      box-shadow: 0 4px 8px rgba(black, 0.4);
    }
  }

  @media only screen and (max-width: 500px) {
    transform: none;

    .container {
      height: auto;
      padding: 15px;
    }
  }
}

.back {
  position: absolute;
  left: 10px;

  @media only screen and (min-width: 501px) {
    top: 0;
    transform: translateX(calc(-100% - 10px));
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
