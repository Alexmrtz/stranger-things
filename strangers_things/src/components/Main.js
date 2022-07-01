import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import SignUp from "./SignUp";
import Login from "./Login";
import Posts from "./Posts";
import CreatePost from "./CreatePost";
import { getMe } from "../api";
import Home from "./Home";
import Message from "./Message";
import View from "./View";
import Profile from "./Profile";
import EditPost from "./EditPost";

const Main = (props) => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState({});

  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `https://strangers-things.herokuapp.com/api/2202-ftb-et-web-ft/posts`
      );
      const data = await response.json();
      setPosts(data.data.posts);
    };
    fetchPost();
  }, []);

  useEffect(() => {
    const currentToken = localStorage.getItem("token");

    const catchMe = async () => {
      const data = await getMe(currentToken);
      setUserObj(data.data);
      setMessages(data.data.messages);
    };

    if (currentToken) {
      setIsLoggedIn(true);
      setToken(currentToken);
      catchMe();
    }
  }, []);
  return (
    <div className="MainClass">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Switch>
        <Route path="/home">
          <Home
            setIsLoggedIn={setIsLoggedIn}
            userObj={userObj}
            setToken={setToken}
            setUserObj={setUserObj}
          />
        </Route>
        <Route path="/users/register">
          <SignUp setIsLoggedIn={setIsLoggedIn} />
        </Route>
        <Route exact path="/">
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setUserObj={setUserObj}
            token={localStorage.getItem("token")}
          />
        </Route>
        <Route path="/posts/:postid/messages">
          <Message posts={posts} />
        </Route>
        <Route path="/posts/view/:postid">
          <View posts={posts} setPosts={setPosts} userObj={userObj} />
        </Route>
        <Route path="/posts">
          <Posts
            userObj={userObj}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            posts={posts}
            setPosts={setPosts}
          />
        </Route>
        <Route path="/createPost">
          <CreatePost
            setIsLoggedIn={setIsLoggedIn}
            posts={posts}
            setPosts={setPosts}
          />
        </Route>
        <Route path="/EditPost">
          <EditPost
            setIsLoggedIn={setIsLoggedIn}
            posts={posts}
            setPosts={setPosts}
          />
        </Route>
        <Route path="/profile">
          <Profile
            userObj={userObj}
            setToken={setToken}
            setIsLoggedIn={setIsLoggedIn}
            setUserObj={setUserObj}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default Main;