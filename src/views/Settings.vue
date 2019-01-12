<template>
  <div class="wrapper">
    <div class="container">
      <h2>Settings</h2>

      <!-- drag n drop / upload image -->
      <div class="droparea display-inline align-center" @dragover.prevent @drop="onDrop">
        <label v-if="!image" class="btn display-inline">
          Select or drop image
          <input type="file" name="image" @change="onChange">
        </label>
        <div class="hidden display-inline align-center" v-else v-bind:class="{ 'image': true }">
          <img :src="image" alt class="img">
        </div>
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
import userIcon from "@/assets/user_img.png";

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
    onDrop: function(e) {
      e.stopPropagation();
      e.preventDefault();
      var files = e.dataTransfer.files;
      this.createFile(files[0]);
    },
    onChange(e) {
      var files = e.target.files;
      this.createFile(files[0]);
    },
    createFile(file) {
      if (!file.type.match("image.*")) {
        alert("Select an image");
        return;
      }
      var img = new Image();
      var reader = new FileReader();
      var vm = this;

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
@import "@/common/card.scss";

.wrapper {
  @extend %card;
}

.setting {
  h3 {
    font-size: 20px;
  }
}

label.btn {
  font-size: 10px;
  display: table-cell;
  vertical-align: middle;
}

.radios {
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  & > * + * {
    margin-top: 10px;
  }
}

.img {
  max-height: 25%;
  max-width: 25%;
  border-radius: 50%;
  margin-bottom: 20px;
}
/*
.droparea {
  border-radius: 50%;
  height: 100%;
  max-height: 400px;
  max-width: 400px;
} */

/* background-color: #f3c96d;
  border-radius: 50%;
  width: 10%;
  max-height: 40%;
  max-width: 40%;
  color: #fff;
  cursor: pointer;
  padding: 28px 45px;
  margin-bottom: 20px;  */

.btn {
  background-color: #f3c96d;
  border-radius: 50%;
  display: block;
  height: 100px;
  width: 100px;
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  margin-bottom: 20px;
}

.btn:hover {
  background-color: #ffa42d;
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.align-center {
  text-align: center;
}

.hidden {
  display: none !important;
}

.hidden.image {
  display: inline-block !important;
}

.display-inline {
  display: inline-block;
  vertical-align: middle;
}
</style>
