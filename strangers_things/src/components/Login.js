import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { loginUser, getMe } from "../api";

const Login = ({ setIsLoggedIn, currentToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  async function handleClick(e) {
    e.preventDefault();
    await loginUser(username, password);

    setUsername("");
    setPassword("");
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      history.push("/home");
      alert("You have successfully signed in");
    }
    const data = await getMe(currentToken);
  }

  return (
    <div className="LoginClass">
      <form onSubmit={handleClick}>
        <input
          value={username}
          type="text"
          placeholder="Username*"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          value={password}
          type="password"
          placeholder="Password*"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Log in</button>
      </form>
      <p>
        Don't have an account?
        <Link className="Sign" to="/users/register">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;