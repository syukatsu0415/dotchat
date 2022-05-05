const port = 3000
const express = require("express")
const app = express()
const server = require("http").createServer(app)
server.listen(port, () => console.log("connected express (port:3000)"))
const io = require("socket.io")(server)
const fs = require("fs")

app.use(express.static('dist'))

// 移動情報をjsonに上書き
const writeMove = (roomNum,userNum,x) => {
  const json = require("./data.json")
  json.room[roomNum][userNum].offsetX = json.room[roomNum][userNum].offsetX + x
  fs.writeFileSync("./data.json", JSON.stringify(json))
}
// 向き情報をjsonに上書き
const writeDirection = (roomNum,obj) => {
  const json = require("./data.json")
  json.room[roomNum][obj.no].direction = obj.num
  fs.writeFileSync("./data.json", JSON.stringify(json))
}

// express(http)
app.get("/reqJson", (req, res) => {
  const json = require("./data.json")
  res.send(json)
})
app.get("/reqJson0", (req, res) => {
  const json = require("./data.json")
  res.send(json.room[0])
})
app.get("/reqJson1", (req, res) => {
  const json = require("./data.json")
  res.send(json.room[1])
})
app.get("/reqJson2", (req, res) => {
  const json = require("./data.json")
  res.send(json.room[2])
})

// Socket.io
io.on("connection", (socket) => {
  // クライアントとのコネクションが確立したらコンソールにSIDを表示
  console.log("connected Socket.io:" + socket.id)

  // ログイン初期情報にSidを追加後、jsonに上書きして全体に適用
  socket.on("sendLoginData0", (e) => {
    const json = require("./data.json")
    json.room[0][e.no] = e
    json.room[0][e.no].sid = socket.id
    fs.writeFileSync("./data.json", JSON.stringify(json))
    io.emit("returnLoginData0", json.room[0])
  })
  socket.on("sendLoginData1", (e) => {
    const json = require("./data.json")
    json.room[1][e.no] = e
    json.room[1][e.no].sid = socket.id
    fs.writeFileSync("./data.json", JSON.stringify(json))
    io.emit("returnLoginData1", json.room[1])
  })
  socket.on("sendLoginData2", (e) => {
    const json = require("./data.json")
    json.room[2][e.no] = e
    json.room[2][e.no].sid = socket.id
    fs.writeFileSync("./data.json", JSON.stringify(json))
    io.emit("returnLoginData2", json.room[2])
  })

  // 右移動
  socket.on("sendR0", (e) => {
    writeMove(0,e,2)
    io.emit("returnR0", e)
  })
  socket.on("sendR1", (e) => {
    writeMove(1,e,2)
    io.emit("returnR1", e)
  })
  socket.on("sendR2", (e) => {
    writeMove(2,e,2)
    io.emit("returnR2", e)
  })

  // 左移動
  socket.on("sendL0", (e) => {
    writeMove(0,e,-2)
    io.emit("returnL0", e)
  })
  socket.on("sendL1", (e) => {
    writeMove(1,e,-2)
    io.emit("returnL1", e)
  })
  socket.on("sendL2", (e) => {
    writeMove(2,e,-2)
    io.emit("returnL2", e)
  })

  // 反転
  socket.on("sendDir0", (e) => {
    writeDirection(0,e)
    io.emit("returnDir0", e)
  })
  socket.on("sendDir1", (e) => {
    writeDirection(1,e)
    io.emit("returnDir1", e)
  })
  socket.on("sendDir2", (e) => {
    writeDirection(2,e)
    io.emit("returnDir2", e)
  })

  // メッセージ
  socket.on("sendMessage0", (e) => {io.emit("returnMessage0", e)})
  socket.on("sendMessage1", (e) => {io.emit("returnMessage1", e)})
  socket.on("sendMessage2", (e) => {io.emit("returnMessage2", e)})

  // セッション切断を検知した場合、セッションIDに紐づくログイン情報を削除
  socket.on("disconnect", () => {
    console.log("disconnect:" + socket.id)
    const json = require("./data.json")
    out:
    for (var i = 0; i < json.room.length; i++) {
      for (var j = 0; j < json.room[i].length; j++) {
        if (json.room[i][j].sid === socket.id) {
          json.room[i][j].sid = ""
          json.room[i][j].login = false
          json.room[i][j].message = ""
          json.room[i][j].direction = 1
          fs.writeFileSync("./data.json", JSON.stringify(json))
          io.emit("returnLoginData"+i, json.room[i])
          break out
        }
      }
    }
  })
})