<template>
  <div class="wrapper">
    <div class="container">
      <h2>Settings</h2>
      <div
        class="picture"
        @dragover.prevent
        @drop.prevent="e => this.createFile(e.dataTransfer.files[0])"
      >
        <label class="picker">
          Select or drop image
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
          <label v-for="value in values">
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
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: "Route Priorities",
      values: [
        "First arrival",
        "Shortest journey",
        "Fewest transfers",
        "Least walking"
      ],
      selected: "",
      image: ""
    };
  },
  mounted: function() {
    this.selected = this.values[1];
  },
  methods: {
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
      background-color: lighten($accent, 10%);
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
  font-size: 25px;
  font-weight: 300;
  height: 100%;
  color: white;
  background: $accent;
  border-radius: 50%;
  transition: background 0.2s;
  cursor: pointer;
}

input[type="file"] {
  display: none;
}
</style>
