const express = require("express");
const {
  createRoom,
  getRoomDetails,
  updateGamePlay,
} = require("../controllers/gameController");

const router = express.Router();

router.post("/createroom", createRoom);

router.get("/getroomdetails/:id", getRoomDetails);

router.patch("/gameplay/:id", updateGamePlay);

module.exports = router;
