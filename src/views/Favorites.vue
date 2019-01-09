<template>
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
.container {
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
</style>
