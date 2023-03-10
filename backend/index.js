const express = require("express");
const cors = require("cors");
const socket = require("socket.io");
const http = require("http");
const gameRouter = require("./routes/gameRoutes");
const userRouter = require("./routes/userRoutes");

require("./db/config");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1", gameRouter);
app.use("/api/v1", userRouter);

const server = http.createServer(app);
let users = [];

const addNewuser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
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

  socket.on("addUser", (userId) => {
    addNewuser(userId, socket.id);
    io.emit("getAllUsers", users);
  });

  socket.on(
    "sendHistory",
    ({ receiverId, currentMove, gamehistory, roomid }) => {
      const user = getUser(receiverId);
      io.to(user.socketId).emit("history", {
        currentMove,
        history: gamehistory,
        roomid,
      });
    }
  );
});

server.listen(8000, () => {
  console.log("8000 port is listening");
});
