<template>
  <header>
    <img class="logo" src="../assets/logo.svg" alt="logo">
    <h1>B-Line</h1>
    <nav>
      <router-link class="route" to="/">Home</router-link>
      <router-link class="route" to="/map">Map</router-link>
      <router-link class="route" to="/favorites">Favorites</router-link>
      <router-link class="route" to="/Settings">Settings</router-link>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
@import "@/common/palette.scss";
@import "@/common/constants.scss";

header {
  display: flex;
  align-items: center;
  position: absolute;
  width: 100%;
  height: $headerHeight;
  top: 0;
  left: 0;
  z-index: 1001;
  box-sizing: border-box;
  padding: 10px;
  background: linear-gradient(
    to right,
    $accent,
    adjust_hue(darken($accent, 5%), -10deg)
  );
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}

img {
  height: 100%;
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

@media only screen and (max-width: 500px) {
  header {
    height: $headerHeightMobile;
  }

  img {
    height: 80%;
  }

  h1 {
    font-size: 24px;
  }

  nav > * + * {
    margin-left: 5px;
  }

  .route {
    font-size: 16px;
  }
}
</style>
