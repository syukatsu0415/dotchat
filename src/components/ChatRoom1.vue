<template>
  <div id='bg-color'>
    <div id="bg-image">
      <div id="controller">
        <router-link class='button size leave' @click.native="leaveRoom()" to="/">戻</router-link>
        <input type="text" size="40" maxlength="40" placeholder="メッセージを入力" value="" id="inputMessage" @keydown.enter="sendMessage(roomNum)"/>
        <div class='button size send' @click="sendMessage(roomNum)">送</div>
        <div class='button size reverse' @click="changeDirection(roomNum)">逆</div>
        <div class='button size l' @click="moveLeft(roomNum)">←</div>
        <div class='button size r' @click="moveRight(roomNum)">→</div>
      </div>
      <div id="chatFrame">
        <user-data :login="users[0].login" :name="users[0].name" :avatar="users[0].avatar" :offsetX="users[0].offsetX" :message="users[0].message" :direction="users[0].direction"/>
        <user-data :login="users[1].login" :name="users[1].name" :avatar="users[1].avatar" :offsetX="users[1].offsetX" :message="users[1].message" :direction="users[1].direction"/>
        <user-data :login="users[2].login" :name="users[2].name" :avatar="users[2].avatar" :offsetX="users[2].offsetX" :message="users[2].message" :direction="users[2].direction"/>
        <user-data :login="users[3].login" :name="users[3].name" :avatar="users[3].avatar" :offsetX="users[3].offsetX" :message="users[3].message" :direction="users[3].direction"/>
        <user-data :login="users[4].login" :name="users[4].name" :avatar="users[4].avatar" :offsetX="users[4].offsetX" :message="users[4].message" :direction="users[4].direction"/>
        <user-data :login="users[5].login" :name="users[5].name" :avatar="users[5].avatar" :offsetX="users[5].offsetX" :message="users[5].message" :direction="users[5].direction"/>
        <user-data :login="users[6].login" :name="users[6].name" :avatar="users[6].avatar" :offsetX="users[6].offsetX" :message="users[6].message" :direction="users[6].direction"/>
        <user-data :login="users[7].login" :name="users[7].name" :avatar="users[7].avatar" :offsetX="users[7].offsetX" :message="users[7].message" :direction="users[7].direction"/>
      </div>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client"
import axios from "axios"
import userData from "./UserData.vue"
import { Mixin } from "./ChatRoomMixin.js"

export default {
  name: "ChatRoom1",
  mixins: [Mixin],
  components: {
    userData
  },
  data() {
    return {
      roomNum:1,
      socket: io(),
      users: [
        { no: 0, sid: "", login: false, name: "", avatar: 0, offsetX: null, message:"", direction: 1},
        { no: 1, sid: "", login: false, name: "", avatar: 0, offsetX: null, message:"", direction: 1},
        { no: 2, sid: "", login: false, name: "", avatar: 0, offsetX: null, message:"", direction: 1},
        { no: 3, sid: "", login: false, name: "", avatar: 0, offsetX: null, message:"", direction: 1},
        { no: 4, sid: "", login: false, name: "", avatar: 0, offsetX: null, message:"", direction: 1},
        { no: 5, sid: "", login: false, name: "", avatar: 0, offsetX: null, message:"", direction: 1},
        { no: 6, sid: "", login: false, name: "", avatar: 0, offsetX: null, message:"", direction: 1},
        { no: 7, sid: "", login: false, name: "", avatar: 0, offsetX: null, message:"", direction: 1}
      ]
    }
  },
  created() {
    // サーバーからRoomの最新状態をJSONで取得（HTTP）
    axios.get("/reqJson"+this.roomNum)
    .then((json) => {
      // JSONの空き部屋番号を検索・取得
      for (var i = 0; i < json.data.length+1; i++) {
        if (json.data[i].login == false) {
          this.$store.commit("changeNo", i)
          break
        }
      }
    })
    // エラー時の処理（空き部屋無し）
    .catch((err) => {
      console.log(err);
      alert("ログイン出来ませんでした")
      this.$router.push("/")
    })
    // ログイン初期情報をSocketに送信
    .then(() => {
      this.socket.emit("sendLoginData"+this.roomNum, {
        no: this.$store.state.no,
        name: this.$store.state.name,
        avatar: this.$store.state.avatar,
        offsetX: this.$store.state.offsetX,
        login: true,
        direction: 1
      })
    })
  }
}
</script>

<style scoped>
@import "./ChatRoomStyles.css";
#bg-color{
background-image: radial-gradient(circle, yellow 0% 15%, coral 60% 100%);
  width: 100%;
  height: 100%;
}
#bg-image {
  position: relative;
  background-image: url(../assets/shonanbg.png);
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}
</style>