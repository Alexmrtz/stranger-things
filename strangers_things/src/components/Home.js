import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { getMe } from "../api";

const Home = ({ userObj, setToken, setIsLoggedIn, setUserObj }) => {
  
  useEffect(() => {
    const currentToken = localStorage.getItem("token");

    const catchMe = async () => {
      const data = await getMe(currentToken);
      setUserObj(data.data);
    };
    if (currentToken) {
      setIsLoggedIn(true);
      setToken(currentToken);
      catchMe();
    }
  }, []);

  return (
    <div className="HomePage">
      <h1>Welcome to Stranger's Things!</h1>
      <h2>Logged in as {userObj.username}</h2>
      <Link className="ProfileLink" to="/profile">
        <button className="ProfileButton">VIEW PROFILE</button>
      </Link>
    </div>
  );
};

export default Home;