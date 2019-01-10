<template>
  <div class="wrapper">
    <div class="container">
      <h2>Favorites</h2>
      <favorite-field
        v-for="field in fields"
        :key="field.id"
        :name="field.name"
        :icon="field.icon"
        :value="field.value"
      />
      <button>Save</button>
    </div>
  </div>
</template>

<script>
import homeIcon from "@/assets/fav_home.png";
import workIcon from "@/assets/fav_work.png";
import schoolIcon from "@/assets/fav_school.png";
import newIcon from "@/assets/fav_new.png";

import FavoriteField from "@/components/FavoriteField.vue";
export default {
  components: {
    FavoriteField
  },
  data: function() {
    return {
      fields: [
        {
          id: 0,
          name: "Home",
          icon: homeIcon,
          value: ""
        },
        {
          id: 1,
          name: "Work",
          icon: workIcon,
          value: ""
        },
        {
          id: 2,
          name: "School",
          icon: schoolIcon,
          value: ""
        },
        {
          id: 3,
          name: "New",
          icon: newIcon,
          value: ""
        }
      ]
    };
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

  & > * + * {
    margin-top: 20px;
  }
}

h2 {
  font-size: 40px;
  font-weight: 300;
}

button {
  align-self: flex-end;
}

@media only screen and (max-width: 500px) {
  .wrapper {
    top: 50px;
    height: calc(100% - 50px);
  }
}
</style>
