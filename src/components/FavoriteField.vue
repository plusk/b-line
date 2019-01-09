<template>
  <div class="FavoriteField">
    <img v-bind:src="icon" v-bind:alt="name">
    <input type="text" v-bind:value="value" v-bind:placeholder="name + ' address'">
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    icon: String,
    value: String
  }
};
</script>

<style lang="scss" scoped>
.FavoriteField {
  display: flex;
  align-items: center;

  input {
    margin-left: 10px;
  }

  input::placeholder {
    text-transform: capitalize;
  }
}
</style>
