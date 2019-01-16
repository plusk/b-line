<template>
  <div class="container error" v-if="keyError || $slots.default">
    <p v-if="keyError">
      Map options not available, as no API key was found. You need to get a
      <a
        href="https://www.mapbox.com/signup/"
      >Mapbox API key</a>.
      It's limited to a couple of thousand requests per day. When you have your key, make a file named ".env.local" at the root of the project,
      then add the following line to the file:
      <code>VUE_APP_API_KEY="INSERT YOUR KEY HERE"</code>
    </p>
    <slot v-else></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyError: false
    };
  },
  mounted() {
    if (process.env.VUE_APP_API_KEY == null) {
      this.keyError = true;
    }
  }
};
</script>



<style lang="scss" scoped>
@import "@/common/palette.scss";

.error {
  color: red;

  code {
    display: block;
    padding: 10px;
    margin-top: 5px;
    color: $dark;
    background: $light;
    font-family: monospace;
  }
}
</style>
