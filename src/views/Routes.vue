<template>
  <div class="wrapper">
    <div
      v-for="route in routes"
      :key="route.id"
      :class="{ container: true, selected: selected === route.id }"
      @click="selectRoute(route.id)"
    >
      <p>{{source}}</p>
      <img class="logo" src="../assets/bus.svg" alt="logo">
      <p>{{destination}}</p>
      <p>{{route.from}}</p>
      <p>{{route.duration}}</p>
      <p>{{route.to}}</p>
      <ul v-if="selected === route.id" class="expanded">
        <li v-for="(point, index) in route.instructions" :key="index">{{point.road}}</li>
      </ul>
    </div>
    <div v-if="error" class="container error">
      <p>No routes found between {{source}} and {{destination}}. If these locations are on different continents, the issue may be that our buses cannot cross oceans.</p>
    </div>
    <div v-else-if="routes.length === 0" class="container loader">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import { format, addSeconds, distanceInWords } from "date-fns";

export default {
  data() {
    return {
      source: "",
      destination: "",
      error: false,
      routes: [],
      selected: 0,
      control: {}
    };
  },
  methods: {
    selectRoute(id) {
      if (id === this.selected) {
        this.selected = -1;
      } else {
        this.selected = id;
      }
      const selectedRoute = this.control._alternatives.find(
        alt => alt._route.routesIndex === id
      );
      selectedRoute.fire("linetouched");
    }
  },
  mounted() {
    const map = this.$root.$data.mapObject;

    this.source = this.$root.$data.source.verbose;
    this.destination = this.$root.$data.destination.verbose;

    const vm = this;

    vm.control = L.Routing.control({
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
      },
      containerClassName: "routing-itinerary-hidden"
    })
      .addTo(map)
      .on("routesfound", e => {
        const now = new Date();
        vm.routes = e.routes.map(route => ({
          id: route.routesIndex,
          from: format(now, "HH:mm"),
          to: format(addSeconds(now, route.summary.totalTime), "HH:mm"),
          duration: distanceInWords(
            now,
            addSeconds(now, route.summary.totalTime)
          ),
          instructions: route.instructions
        }));
        vm.error = false;
      })
      .on("routeselected", e => {
        vm.selected = e.route.routesIndex;
      })
      .on("routingerror", () => {
        vm.error = true;
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

    &.loader {
      display: block;

      .spinner {
        border: 8px solid #eee;
        border-top: 8px solid transparentize($accent, 0.25);
        border-radius: 50%;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        animation: spin 2s linear infinite;
      }
    }

    &.error {
      display: block;
      color: red;
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

.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.selected {
  outline: 2px solid $accent;
}

$dotSize: 10px;

.expanded {
  grid-column: 1 / 4;
  text-align: left;
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding-left: 15%;

  li {
    position: relative;
    margin-left: $dotSize * 2;
    margin-top: 5px;

    &:hover::after {
      background: $accent;
    }

    &:empty {
      display: none;
    }

    &::before {
      position: absolute;
      display: block;
      content: "";
      width: 1px;
      background: $dark;
      height: 150%;
      left: -$dotSize - $dotSize/2 -1;
    }

    &::after {
      position: absolute;
      display: block;
      content: "";
      height: $dotSize;
      width: $dotSize;
      background: $dark;
      left: -$dotSize * 2;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      transition: background-color 0.05s;
    }
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
