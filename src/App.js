import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import JoinRoom from "./components/Joingame";
import StartGame from "./components/StartGame";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<StartGame />} />
          <Route path={"/room/:id"} element={<Game />} />
          <Route path="/joinRoom" element={<JoinRoom />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
