<template>
  <div class="wrapper">
    <div class="container">
      <h2>Favorites</h2>
      <favorite-field
        v-for="(field, index) in fields"
        :key="index"
        :name="field.name"
        :icon="field.icon"
        :value="field.value"
      />

      <button>Save</button>
    </div>
  </div>
</template>

<script>
import homeIcon from "@/assets/home_fav.svg";
import workIcon from "@/assets/work_fav.svg";
import schoolIcon from "@/assets/school_fav.svg";
import newIcon from "@/assets/add_fav.svg";

import FavoriteField from "@/components/FavoriteField.vue";
export default {
  components: {
    FavoriteField
  },
  data() {
    return {
      fields: [
        {
          name: "Home",
          icon: homeIcon,
          value: this.$root.$data.favorites["Home"]
            ? this.$root.$data.favorites["Home"].verbose
            : ""
        },
        {
          name: "Work",
          icon: workIcon,
          value: this.$root.$data.favorites["Work"]
            ? this.$root.$data.favorites["Work"].verbose
            : ""
        },
        {
          name: "School",
          icon: schoolIcon,
          value: this.$root.$data.favorites["School"]
            ? this.$root.$data.favorites["School"].verbose
            : ""
        },
        {
          name: "New",
          icon: newIcon,
          value: this.$root.$data.favorites["New"]
            ? this.$root.$data.favorites["New"].verbose
            : ""
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
