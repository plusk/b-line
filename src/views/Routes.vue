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
    <div
      v-for="route in listedRoutes"
      :key="route.id"
      :class="{ container: true, selected: selected === route.id, expanded: selected === route.id && !selectedCollapsed }"
      @click="selectRoute(route.id)"
    >
      <div class="top">
        <div class="left">
          <p>{{$root.$data.source.verbose}}</p>
          <p>{{route.from}}</p>
        </div>
        <div class="middle">
          <img class="logo" src="../assets/bus.svg" alt="logo">
          <p>{{route.duration}}</p>
        </div>
        <div class="right">
          <p>{{$root.$data.destination.verbose}}</p>
          <p>{{route.to}}</p>
        </div>
      </div>
      <div v-if="choiceMade" class="success">Enjoy your trip!</div>
      <div v-else-if="selected === route.id && !selectedCollapsed" class="expanded">
        <div class="vertical-line"></div>
        <div v-for="(point, index) in route.instructions" :key="index" class="instruction">
          <span v-if="point.time" class="time">{{point.time}}</span>
          <span v-if="point.road" class="road">{{point.road}}</span>
        </div>
        <button class="forward" @click="toggleChoice">&#62;</button>
      </div>
    </div>
    <button class="back" @click="goBack">&#60;</button>
  </div>
</template>

<script>
import L from "leaflet";
import { format, addSeconds, distanceInWords } from "date-fns";

import ErrorContainer from "@/components/ErrorContainer.vue";

export default {
  components: {
    ErrorContainer
  },
  data() {
    return {
      error: false,
      routes: [],
      selected: 0,
      selectedCollapsed: true,
      choiceMade: false,
      control: {}
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
        this.$router.go(-1);
      }
    }
  },
  mounted() {
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

.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  line-height: 1.25;
  width: 100%;
}

.left {
  text-align: left;
}

.middle {
  text-align: center;
}

.right {
  text-align: right;
}

.selected {
  outline: 2px solid $accent;
}

$dotSize: 10px;
$dotPadding: 20px;

.expanded {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  user-select: none;

  .vertical-line {
    display: block;
    position: fixed;
    width: 1px;
    background: $dark;
    height: calc(100% - 210px);
    left: 80px;
  }

  .instruction {
    position: relative;
    margin-top: 5px;
    min-height: 20px;

    &:hover {
      .time,
      .road {
        color: $dark;
      }

      .time::after {
        background: $accent;
      }
    }

    &:empty {
      display: none;
    }

    .time {
      position: relative;
      transform: translateX(-100%);
      color: lighten($dark, 50%);
      transition: color 0.1s;

      &::after {
        position: absolute;
        display: block;
        content: "";
        height: $dotSize;
        width: $dotSize;
        background: $dark;
        right: -$dotSize / 2 * 3;
        border-radius: 50%;
        top: 50%;
        transform: translateY(-50%);
        transition: background-color 0.05s;
      }
    }

    .road {
      position: absolute;
      margin-left: $dotPadding;
      color: lighten($dark, 10%);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: calc(100% - 100px);
    }
  }
  @media only screen and (min-width: 501px) {
    overflow-y: auto;
    max-height: calc(100vh - 199px);
  }
  @media only screen and (max-width: 500px) {
    .vertical-line {
      position: absolute;
      left: 50px;
      height: 100%;
    }
  }
}

button.forward {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}

.choiceMade .container:not(.selected) {
  display: none;
}

.choiceMade .selected {
  outline-color: limegreen;
}

.back {
  position: absolute;
  left: 10px;

  @media only screen and (min-width: 501px) {
    top: 0;
    transform: translateX(calc(-100% - 10px));
  }
}

.success {
  color: green;
  font-size: 200%;
  font-weight: 300;
  padding-top: 20px;
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
