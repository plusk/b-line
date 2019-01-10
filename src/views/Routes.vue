<template>
  <div class="wrapper">
    <div v-for="route in routes" :class="{container: true, highlighted: route.fastest}">
      <p>{{source}}</p>
      <img class="logo" src="../assets/bus.svg" alt="logo">
      <p>{{destination}}</p>
      <p>{{route.from}}</p>
      <p>{{route.duration}} min</p>
      <p>{{route.to}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      source: "Templiers",
      destination: "Briand",
      routes: [
        {
          from: "13:37",
          to: "14:05",
          duration: "28"
        },
        {
          from: "13:40",
          to: "14:04",
          duration: "24",
          fastest: true
        },
        {
          from: "13:42",
          to: "14:07",
          duration: "25"
        },
        {
          from: "13:38",
          to: "14:04",
          duration: "26"
        },
        {
          from: "13:39",
          to: "14:06",
          duration: "27"
        }
      ]
    };
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

    & > * + * {
      margin: 0;
    }

    img {
      height: 30px;
      margin: 0 auto;
    }
  }

  .highlighted {
    outline: 2px solid $accent;
  }
}

.top {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
