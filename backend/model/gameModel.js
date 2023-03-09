const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
    },
    currentMove: {
      type: Number,
      default: 0,
    },
    gamehistory: [],
    gameStarted: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
