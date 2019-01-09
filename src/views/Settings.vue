<template>
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
.container {
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
</style>
