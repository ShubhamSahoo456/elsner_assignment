import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StartGame = () => {
  const navigate = useNavigate();
  const createRoom = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/v1/createroom"
      );
      if (data.roomId) {
        navigate(`/room/${data.roomId}`);
      } else {
        window.alert("unable to create room. please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const joinRoom = () => {
    navigate(`/joinRoom`);
  };
  return (
    <>
      <div className="room">
        <button onClick={createRoom}>Create room</button>
        <button onClick={joinRoom}>Join Room</button>
      </div>
    </>
  );
};

export default StartGame;
