<template>
  <div id="app" class="caution">
    <router-view />
  </div>
</template>

<style>
@font-face {
  font-family: "misaki";
  src: url("./assets/misaki_gothic.woff")  format('woff');
}
#app {
  font-family: "misaki";
  border: 3px solid black;
  margin: auto;
}
@media (orientation: portrait) and (max-width: 480px){
  #app {
    width: 100%;
    height: 10%;
  }
  .caution {
    content : url(./assets/caution.png)
  }
}
@media screen and (min-width: 480px){
  #app {
    font-size:12px;
    width: 97vw;
    height: 94vh;
  }
}
@media screen and (min-width: 1024px){
  #app {
    font-size:16px;
    width: 70vw;
    height: 80vh;
  }
}
</style>