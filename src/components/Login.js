import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8000/api/v1/login", {
        email,
        password,
      });
      if (data._id) {
        localStorage.setItem("social", JSON.stringify(data));
        navigate("/createroom");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="login_container">
        <div className="login_wrapper">
          <div className="login_left">
            <div className="text_">
              <h1>Tic Tac Toe</h1>
            </div>
          </div>
          <div className="login_right">
            <form onSubmit={loginUser}>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="login_input "
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="login_input"
              />
              <button type="submit" className="login_input btn_login">
                Log In
              </button>
            </form>
            <a href="#" className="forgon_password">
              {" "}
              Forgot Password?
            </a>
            <div className="create_account">
              <Link to="/" style={{ width: "70%", textAlign: "center" }}>
                <button>Create An Account</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
