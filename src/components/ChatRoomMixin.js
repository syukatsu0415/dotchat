export const Mixin =  {
    computed: {
        no() {return this.$store.state.no},
        name() {return this.$store.state.name},
        avatar() {return this.$store.state.avatar},
        offsetX() {return this.$store.state.offsetX}
    },
    methods: {
        // 退室時にセッションを切断
        leaveRoom: function () {
            this.socket.close()
        },
        // ページ不正遷移時にban画面表示
        ban: function () {
            this.$router.push("/ban")
            this.socket.close()
        },
        // アバター右移動
        moveRight: function (roomNum) {
            if(this.users[this.$store.state.no].offsetX >= 90){return}
            else{this.socket.emit("sendR"+roomNum, this.$store.state.no)}
        },
        // アバター左移動
        moveLeft: function (roomNum) {
            if(this.users[this.$store.state.no].offsetX <= 0){return}
            else{this.socket.emit("sendL"+roomNum, this.$store.state.no)}
        },
        // アバターの向きを変える
        changeDirection: function (roomNum) {
            if(this.users[this.$store.state.no].direction == 1){
            this.socket.emit("sendDir"+roomNum, {
                no: this.$store.state.no,
                num: -1
                })
            }else{
            this.socket.emit("sendDir"+roomNum, {
                no: this.$store.state.no,
                num: 1
                })
            }
        },
        // メッセージ送信
        sendMessage: function (roomNum) {
            let inputMessage = document.querySelector("input[id=inputMessage]").value
            if (inputMessage === '') {return}
            else{
                document.querySelector("input[id=inputMessage]").value = ''
                this.socket.emit("sendMessage"+roomNum, {
                no: this.$store.state.no,
                message: inputMessage
                })
            }
        }
    },
    created() {
        // サーバーから更新データを受信した場合、情報をDataに反映
        this.socket.on("returnLoginData"+this.roomNum, (obj) => {
          for (var i = 0; i < obj.length; i++) {
            this.$set(this.users[i], "sid", obj[i].sid)
            this.$set(this.users[i], "login", obj[i].login)
            this.$set(this.users[i], "name", obj[i].name)
            this.$set(this.users[i], "avatar", obj[i].avatar)
            this.$set(this.users[i], "offsetX", obj[i].offsetX)
            this.$set(this.users[i], "direction", obj[i].direction)
          }
        })
    },
    mounted() {
        this.$nextTick(function () {
            //リロードされた場合ban画面に遷移
            if (window.performance.navigation.type === window.performance.navigation.TYPE_RELOAD) {
            this.ban()
            }
            // ブラウザバックでアクセスされた場合ban画面に遷移
            if (window.performance.navigation.type === window.performance.navigation.TYPE_BACK_FORWARD) {
            this.ban()
            }
            // ブラウザバックを押された場合退室処理
            window.addEventListener("popstate", this.leaveRoom)
            // ブラウザを閉じられた場合退室処理
            window.addEventListener("beforeunload", this.leaveRoom)
            window.addEventListener("unload", this.leaveRoom)

            // 移動
            this.socket.on("returnR"+this.roomNum, (e) => {this.$set(this.users[e], "offsetX", this.users[e].offsetX + 2)})
            this.socket.on("returnL"+this.roomNum, (e) => {this.$set(this.users[e], "offsetX", this.users[e].offsetX - 2)})
            // 反転
            this.socket.on("returnDir"+this.roomNum, (e) => {this.$set(this.users[e.no], "direction", e.num)})
            // メッセージ受信
            this.socket.on("returnMessage"+this.roomNum, (e) => {this.$set(this.users[e.no], "message", e.message)})
        })
    }
}