<template>
  <header>
    <img class="logo" src="../assets/logo.svg" alt="logo">
    <h1>B-Line</h1>
    <nav>
      <router-link class="route" to="/">Home</router-link>
      <router-link class="route" to="/about">About</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "page-header"
};
</script>


<style lang="scss" scoped>
@import "@/common/palette.scss";

header {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 75px;
  top: 0;
  left: 0;
  z-index: 1000;
  box-sizing: border-box;
  padding: 10px;
  background: linear-gradient(
    to right,
    $accent,
    adjust_hue(darken($accent, 5%), -10deg)
  );
}

img {
  height: 50px;
}

h1 {
  color: white;
  font-size: 40px;
  font-weight: 300;
  user-select: none;
}

nav {
  margin-left: auto;

  & > * + * {
    margin-left: 15px;
  }
}

.route {
  display: inline-block;
  color: white;
  font-size: 20px;
  text-decoration: none;
  position: relative;
  transition: color 0.2s;
  padding: 5px;

  &::after {
    content: "";
    display: block;
    position: absolute;
    background: currentColor;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    transform: scaleX(0);
    transition: transform 0.1s;
  }

  &:hover,
  &.router-link-exact-active {
    &::after {
      transform: scaleX(1);
    }
  }

  &:focus {
    outline-width: 2px;
    outline-style: solid;
  }
}
</style>
