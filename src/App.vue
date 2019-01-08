<template>
  <div id="app">
    <page-header/>
    <page-content/>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";
import PageContent from "@/components/PageContent.vue";

export default {
  components: {
    PageHeader,
    PageContent
  }
};
</script>

<style lang="scss">
@import "@/common/reset.scss";
@import "@/common/palette.scss";

@import url("https://fonts.googleapis.com/css?family=Lato:300,400,400i,600,700");

body {
  color: $dark;
  font-family: "Lato", sans-serif;
  background: #fafafa;
}

button {
  background: $dark;
  color: $light;
  padding: 10px;
  font-size: inherit;
  border-radius: 2px;
  transition: background 0.2s;

  &:hover {
    background: lighten($dark, 20%);
    cursor: pointer;
  }
}

input[type="text"],
input[type="search"] {
  border-bottom: 2px solid;
  padding: 10px;
  transition: border 0.2s;

  &:hover,
  &:focus {
    border-color: $accent;
  }

  &:focus {
    outline-width: 2px;
    outline-style: solid;
  }
}

.leaflet-container {
  width: 100%;
  top: 75px;
  height: calc(100vh - 75px);
}
</style>
