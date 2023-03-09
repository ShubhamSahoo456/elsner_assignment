import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();
  const joinRoom = () => {
    navigate(`/room/${roomId}`);
  };

  return (
    <>
      <div>
        <input
          placeholder="Enter Room id"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button onClick={joinRoom}>join</button>
      </div>
    </>
  );
};

export default JoinRoom;
