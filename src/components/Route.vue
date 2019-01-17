<template>
  <div
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
</template>

<script>
export default {
  props: {
    route: Object,
    selected: Number,
    choiceMade: Boolean,
    selectRoute: Function,
    toggleChoice: Function,
    selectedCollapsed: Boolean
  }
};
</script>


<style lang="scss" scoped>
@import "@/common/palette.scss";

img {
  height: 30px;
  margin: 0 auto;
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
    position: absolute;
    width: 1px;
    background: $dark;
    height: 100%;
    left: 50px;
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

.success {
  color: green;
  font-size: 200%;
  font-weight: 300;
  padding-top: 20px;
}
</style>
