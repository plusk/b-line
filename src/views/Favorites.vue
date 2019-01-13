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
  data() {
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
@import "@/common/card.scss";

.wrapper {
  @extend %card;
}
</style>
