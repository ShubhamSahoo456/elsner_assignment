const Game = require("../model/gameModel");

const createRoom = async (req, res) => {
  try {
    const uniqueRoomId = Math.floor(100000 + Math.random() * 900000).toString();
    const gamehistory = [
      [null, null, null, null, null, null, null, null, null],
    ];
    const obj = { roomId: uniqueRoomId, gamehistory };
    const saveData = new Game(obj);
    const data = await saveData.save();
    res.json(data);
  } catch (error) {
    console.log(error);
  }
};

const getRoomDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await Game.findOne({ roomId: id });
    res.json(data);
  } catch (error) {
    console.log(erro);
  }
};

const updateGamePlay = async (req, res) => {
  try {
    const { id } = req.params;
    const { currentMove, gamehistory } = req.body;
    const data = await Game.findOne({ roomId: id });
    //console.log(data);
    if (data) {
      data.currentMove = currentMove;
      data.gamehistory = gamehistory;
      const updateNote = await data.save();
      res.json(updateNote);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRoom,
  getRoomDetails,
  updateGamePlay,
};
