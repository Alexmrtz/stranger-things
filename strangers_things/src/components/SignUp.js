import React, { useState } from "react";
import { registerUser } from "../api";
import { Link, useHistory } from "react-router-dom";

const SignUp = (setIsLoggedIn) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isLoggedIn = setIsLoggedIn;

  let history = useHistory();

  async function handleClick(e) {
    e.preventDefault();
    await registerUser(username, password);

    setUsername("");
    setPassword("");
    const token = localStorage.getItem("token");

    if (token) {
      history.push("/");
      await setIsLoggedIn(true);
    }
  }

  return (
    <div className="SignUpClass">
      <form onSubmit={handleClick}>
        <input
          value={username}
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button type="submit">Sign Up</button>
      </form>
      <p>
         Have an account?
        <Link className="Sign" to="/">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;