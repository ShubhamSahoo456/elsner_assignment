import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Socket from "./Socket";
import { uuid } from "uuidv4";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value ? value : ""}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, roomId }) {
  async function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares;
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">RoomId - {roomId}</div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [roomid, setRoomId] = useState(0);
  const [currentMove, setCurrentMove] = useState(0);
  const params = useParams();
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];
  const socket = useRef();
  const [socketusers, setSocketUsers] = useState({});

  const getRoomDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/v1/getroomdetails/${params.id}`
      );
      setCurrentMove(data.currentMove);
      setHistory(data.gamehistory);
      setRoomId(data.roomId);
    } catch (error) {}
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("social"));
    socket.current = Socket;
    socket.current.emit("addUser", userInfo._id);
    socket.current.on("getAllUsers", (data) => {
      setSocketUsers(data);
      console.log(data);
    });
    socket.current.on("disconnectUser", (data) => {
      setSocketUsers(data);
      alert("user disconnected");
    });
    socket.current.on("history", (data) => {
      setHistory(data.history);
      setCurrentMove(data.currentMove);
    });
  }, []);

  useEffect(() => {
    getRoomDetails();
  }, []);

  async function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    const { data } = await axios.patch(
      `http://localhost:8000/api/v1/gameplay/${params.id}`,
      {
        currentMove: nextHistory.length - 1,
        gamehistory: nextHistory,
      }
    );
    const userInfo = JSON.parse(localStorage.getItem("social"));
    const receiverId = socketusers.filter(
      (user) => user.userId !== userInfo._id
    );
    socket.current.emit("sendHistory", {
      receiverId: receiverId[0].socketId,
      currentMove: nextHistory.length - 1,
      gamehistory: nextHistory,
      roomid: params.id,
    });
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          roomId={roomid}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info"></div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
