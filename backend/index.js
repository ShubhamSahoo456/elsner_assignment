const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const http = require("http");
const gameRouter = require("./routes/gameRoutes");

require("./db/config");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", gameRouter);

const server = http.createServer(app);
let users = [];

const addNewuser = (gameId, socketId) => {
  !users.some((user) => user.gameId === gameId) &&
    users.push({ gameId, socketId });
};

const getUser = (receiverId) => {
  return users.find((ele) => ele.userId === receiverId);
};

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("a user is connected to backend socket server");
  socket.on("sendHistory", ({ userId }) => {
    addNewuser(userId, socket.id);

    console.log(users);
    io.emit("getAllUsers", users);

    socket.on("disconnect", () => {
      console.log("a user is disconnected");
      // removeUser(socket.id);
    });

    socket.on("history", ({ currentMove, gamehistory, roomid }) => {
      const user = getUser(receiverId);
      console.log(text);
      io.to(user.socketId).emit("getmessages", {
        currentMove,
        history: gamehistory,
        roomid,
      });
    });
  });
});

server.listen(8000, () => {
  console.log("8000 port is listening");
});
