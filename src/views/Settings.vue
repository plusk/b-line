<template>
  <div class="wrapper">
    <error-container></error-container>
    <div class="container">
      <h2>Settings</h2>
      <div
        class="picture"
        @dragover.prevent
        @drop="e => this.createFile(e.dataTransfer.files[0])"
        @drop.prevent
      >
        <label class="picker">
          Select or
          <br>drop image
          <input
            type="file"
            accept="image/*"
            @change="e => createFile(e.target.files[0])"
          >
        </label>
        <img v-if="image" :src="image" alt="profile picture">
      </div>
      <div class="setting">
        <h3>{{title}}</h3>
        <div class="radios">
          <label v-for="(value, index) in values" :key="index">
            <input
              type="radio"
              v-model="selected"
              v-bind:value="value"
              v-bind:checked="selected === value"
            >
            {{value}}
          </label>
        </div>
      </div>
      <div class="setting">
        <label>
          <input type="checkbox" v-model="$root.$data.showFavorites" @change="check">
          {{checkText}}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import ErrorContainer from "@/components/ErrorContainer.vue";

export default {
  components: {
    ErrorContainer
  },
  data() {
    return {
      title: "Route Priorities",
      values: [
        "First arrival",
        "Shortest journey",
        "Fewest transfers",
        "Least walking"
      ],
      selected: "",
      image: "",
      checkText: "Show Favorites on map"
    };
  },
  mounted() {
    this.selected = this.values[1];
  },
  methods: {
    check() {
      const { showFavorites, map, favorites } = this.$root.$data;
      for (const favName in favorites) {
        const fav = favorites[favName];
        if (Object.keys(fav.mark).length !== 0) {
          if (showFavorites) {
            fav.mark.addTo(map);
          } else {
            map.removeLayer(fav.mark);
          }
        }
      }
    },
    createFile(file) {
      if (!file.type.match("image.*")) {
        alert("Select an image");
        return;
      }
      const reader = new FileReader();
      const vm = this;

      reader.onload = function(e) {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/constants.scss";
@import "@/common/palette.scss";
@import "@/common/card.scss";

.wrapper {
  @extend %card;
}

.setting {
  h3 {
    font-size: 20px;
  }
}

.radios {
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 10px;
  }
}

.picture,
.picker,
img {
  height: 150px;
  width: 150px;
  border-radius: 50%;
}

.picture {
  position: relative;

  &:hover {
    img {
      filter: brightness(150%);
    }
    .picker {
      background-color: lighten($dark, 10%);
    }
  }
}

img {
  position: absolute;
  top: 0;
  object-fit: cover;
  pointer-events: none;
  transition: filter 0.2s;
}

.picker {
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-weight: 300;
  height: 100%;
  color: white;
  background: $dark;
  border-radius: 50%;
  transition: background 0.2s;
  cursor: pointer;
}

input[type="file"] {
  display: none;
}
</style>
