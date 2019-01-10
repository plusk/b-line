<template>
  <div class="wrapper">
    <div class="container">
      <h2>Settings</h2>
      <div class="setting">
        <h3>{{title}}</h3>
        <div class="radios">
          <label v-for="value in values">
            <input
              type="radio"
              v-model="selected"
              v-bind:value="value"
              v-bind:checked="selected === value"
            >
            {{value}}
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: "Route Priorities",
      values: [
        "First arrival",
        "Shortest journey",
        "Fewest transfers",
        "Least walking"
      ],
      selected: ""
    };
  },
  mounted: function() {
    this.selected = this.values[1];
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/constants.scss";

.wrapper {
  position: absolute;
  left: 0;
  top: $pageHeaderHeight;
  width: 100%;
  height: calc(100% - #{$pageHeaderHeight});
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  z-index: 1000;
  box-sizing: border-box;
  background: #f2f2f2;
}

.container {
  width: 100%;
  max-width: 500px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 40px;
  font-weight: 300;
}

.setting {
  margin-top: 10px;
  h3 {
    font-size: 20px;
  }
}

.radios {
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 10px;
  }
}

@media only screen and (max-width: 500px) {
  .wrapper {
    top: 50px;
    height: calc(100% - 50px);
  }
}
</style>
