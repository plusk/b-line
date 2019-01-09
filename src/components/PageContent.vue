<template>
  <div class="wrapper">
    <main>
      <router-view/>
    </main>
  </div>
</template>


<style lang="scss" scoped>
.wrapper {
  position: absolute;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 500px;
  min-width: 250px;
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
}

main {
  padding: 20px;
  background: white;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
}
</style>
