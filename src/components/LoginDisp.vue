<template>
  <div id='bg-image'>
    <div id='logo' class='logo-color'>
      <img :src="require(`@/assets/logo.png`)" id='logoImg' />
    </div>
    <h1 id='title'>- ドットチャット -</h1>
    <div id='imageSelect'>
        <img :src="require(`@/assets/l.png`)" class='l animeLeft' @click="prevImg()" />
        <img :src="require(`@/assets/${user.avatar}.png`)" id='avatar' /> 
        <img :src="require(`@/assets/r.png`)" class='r animeRight' @click="nextImg()" />
    </div>
    <div id='inputName'>
      <input v-model="user.name" type="text" maxlength="5" size="14" placeholder="名前を入力(～5文字)"/>
    </div>
    <div id='map'> 
      <div id='vacancy'>
        <div>{{'TOKIO:'+this.vacancy[0]+'/8'}}</div>
        <div>{{'FUJI :'+this.vacancy[2]+'/8'}}</div>
        <div>{{'SHONAN:'+this.vacancy[1]+'/8'}}</div>
      </div>
      <img :src="require(`@/assets/tokio.png`)" id='tokio' class='animeUp' @click="goTokio" />
      <img :src="require(`@/assets/shonan.png`)" id='shonan' class='animeUp' @click="goShonan" />
      <img :src="require(`@/assets/fuji.png`)" id='fuji' class='animeUp' @click="goFuji" />
    </div>
    <div id='footer'>◎ 2022 HORIUCHI.T</div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'LoginDisp',
  data () {
    return {
      user: {name:'', avatar:0},
      vacancy: [0, 0, 0]
    }
  },
  methods: {
    // サーバーから全Roomの入室人数を取得（HTTP）
    getVacancy: function(){
      axios.get("/reqJson") 
      .then((json) => {
        for (var i = 0; i < json.data.room.length; i++) {
          for (var j = 0; j < json.data.room[i].length; j++) {
            if (json.data.room[i][j].login === true) {
              this.$set(this.vacancy, i, this.vacancy[i] +1)
            }
          }
        }
      })
    },
    // 画像次
    nextImg: function(){
      if(this.user.avatar==22){this.$set(this.user, 'avatar', 0)}
      else{this.$set(this.user, 'avatar', this.user.avatar +1)}
    },
    // 画像前
    prevImg: function(){
      if(this.user.avatar==0){this.$set(this.user, 'avatar', 22)}
      else{this.$set(this.user, 'avatar', this.user.avatar -1)}
    }, 
    // ChatRoomに渡す為の各種情報をStoreに格納
    enterRoom: function(){
      let offsetX = Math.floor(Math.random() * 91)
      if(offsetX % 2 == 1){this.$store.commit('changeOffsetX', offsetX + 1)}
      else{this.$store.commit('changeOffsetX', offsetX)}
      if(this.user.name === ''){this.$store.commit('changeName', '名無し')}
      else{this.$store.commit('changeName', this.user.name)}
      this.$store.commit('changeAvatar', this.user.avatar)
    },
    goTokio: function(){
      this.$router.push("/tokio")
      this.enterRoom()
    },
    goShonan: function(){
      this.$router.push("/shonan")
      this.enterRoom()
    },
    goFuji: function(){
      this.$router.push("/fuji")
      this.enterRoom()
    },
    ban: function () {
      this.$router.push("/ban")
    },
  },
  mounted() {
    this.$nextTick(function () {
      //非同期処理で退室前の部屋人数が取得される場合がある為、0.05秒の実行ラグを設定
      setTimeout(this.getVacancy, 50)

      //リロードされた場合禁止画面に遷移
      if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
        this.ban()
      }
      //ログイン画面に戻った場合以前の入力情報を適用
      this.$set(this.user, 'name', this.$store.state.name)
      this.$set(this.user, 'avatar', this.$store.state.avatar)
    })
  }
}
</script>

<style scoped>
#bg-image {
  position: relative;
  width: 100%;
  height: 100%;
  background-color:black;
  display: flex;
  justify-content: center;
}
#logo{
  position:absolute;
  width: 45%;
  height: 22%;
  display: flex;
  justify-content: center;
}
.logo-color{
  animation: logochange 7s steps(1, end) infinite;
  width: 100%;
  height: 100%;
}
@keyframes logochange{
  0%   {background:red;}
  14%  {background:orange;}
  28%  {background:yellow;}
  42%  {background:greenyellow;}
  56%  {background:aqua;}
  70%  {background:dodgerblue;}
  84%  {background:blueviolet;}
  100% {background:red;}
}
#logoImg{
  position:absolute;
  display:block;
  margin:auto;
  width: 100%;
  height: 100%;
}
#title{
  position: absolute;
  display:block;
  color:white;
  margin:auto;
  font-size: 1.8vw;
  bottom:71%;
}
#imageSelect{
  position:absolute;
  width: 10vw;
  height: 20vh;
  justify-content: center;
  bottom:53%;
  display: flex;
}
#avatar{
  width: 75%;
  height: 75%;
  margin:auto;
  bottom:0%;
}
.l{
  position:absolute;
  cursor: pointer;
  width: 9%;
  height: 16%;
  bottom:25%;
  left:0%;
}
.r{
  position:absolute;
  cursor: pointer;
  width: 9%;
  height: 16%;
  bottom:25%;
  right:0%;
}
#inputName{
  position:absolute;
  margin-top:10px;
  text-align: center;
  bottom:49%;
}
input[type=text]{
  height:2.8vh;
}
#map{
  background-image:url(../assets/map.png);
  position: absolute;
  background-size: 100% 100%;
  width: 42%;
  height: 44%;
  margin:auto;
  bottom:4%
}
#vacancy{
  position: absolute;
  font-size: 1.1vw;
  bottom:1.8%;
  right:1.5%;
}
#tokio {
  position: absolute;
  cursor: pointer;
  top:7%;
  left:54%;
  height:22%;
  width:10%;
}
#shonan {
  position: absolute;
  cursor: pointer;
  top:50%;
  left:43%;
  height:15%;
  width:10%;
}
#fuji {
  position: absolute;
  cursor: pointer;
  top:37%;
  left:15%;
  height:20%;
  width:17%;
}
#footer{
  position: absolute;
  color:white;
  font-size: 1.5vw;
  bottom:-0.5%;
}
.animeUp {
  animation:animeUp 1s steps(2, end) infinite alternate;
}
@keyframes animeUp {
  0% {transform: translate(0,0px);}
  100% {transform: translate(0,-8px)}
}
.animeLeft {
animation:animeLeft 1s steps(2, end) infinite alternate;
}
@keyframes animeLeft {
  0% {transform: translate(0,0px);}
  100% {transform: translate(-6px,0)}
}
.animeRight {
  animation:animeRight 1s steps(2, end) infinite alternate;
}
@keyframes animeRight {
  0% {transform: translate(0,0px);}
  100% {transform: translate(6px,0px)}
}
</style>