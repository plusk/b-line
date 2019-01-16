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
      <button @click="save">Save</button>
      <div v-if="show" class="container">
        <p> Succesively saved! </p>
      </div>
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
          name: "home",
          icon: homeIcon,
          value: this.$root.$data.favorites["home"]
            ? this.$root.$data.favorites["home"].verbose
            : ""
        },
        {
          name: "work",
          icon: workIcon,
          value: this.$root.$data.favorites["work"]
            ? this.$root.$data.favorites["work"].verbose
            : ""
        },
        {
          name: "school",
          icon: schoolIcon,
          value: this.$root.$data.favorites["school"]
            ? this.$root.$data.favorites["school"].verbose
            : ""
        },
        {
          name: "new",
          icon: newIcon,
          value: this.$root.$data.favorites["new"]
            ? this.$root.$data.favorites["new"].verbose
            : ""
        }
      ],
      show: false
    };
  },
  methods: {
    save: function(event){
      this.show= true;
      var favorites = this; 
                 // so you could use it in a callback function. You have
                 // to do that because it has its own `this` defined
      setTimeout(function() {
          favorites.show = false;
      }, 5 * 1000);
    }
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
