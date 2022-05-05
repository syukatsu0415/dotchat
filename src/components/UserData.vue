<template>
  <div id='userFlame' v-if="login" :style="{ left: `${this.offsetX}%`}">
    <div v-show="message !== '' " class='balloon'>{{ message }}</div>
    <img :src="require(`@/assets/${this.avatar}.png`)" :style="{ transform: `scale(${this.direction}, 1)` }"/>
    <div class="nameSpace">{{ name }} </div>
  </div>
</template>

<script>
export default {
  props: {
    no: { type: Number },
    sid: { type: String },
    login: { type: Boolean },
    name: { type: String },
    avatar: { type: Number },
    offsetX: { type: Number },
    message: { type: String },
    direction: { type: Number }
  }
}
</script>

<style scoped>
#userFlame {
  position: absolute;
  display:flex;
  justify-content: center;
  width: 10%;
  height: 100%;
}
.balloon {
  display: block;
  position: absolute;
  bottom:62%;
  margin:auto;
  text-align: center;
  background: #ffffff;
  border: 3px solid #000000;
  color:black;
  padding:5px 3px;
}
.balloon:after,.balloon:before {
  top: 100%;
  left: 50%;
  border: solid transparent;
  content: "";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}
.balloon:after {
  border-color: rgba(255, 255, 255, 0);
  border-top-color: #ffffff;
  border-width: 5px;
  margin-left: -5px;
}
.balloon:before {
  border-color: rgba(0, 0, 0, 0);
  border-top-color: #000000;
  border-width: 9px;
  margin-left: -9px;
}
img {
  display:block;
  position: absolute;
  width: 100%;
  height: 60%;
  bottom:22%;
}
.nameSpace {
  position: absolute;
  text-align: center;
  width: 100%;
  height: 10%;
  bottom:5%;
  white-space: nowrap;
}
</style>