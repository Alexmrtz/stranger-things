import React, { useEffect } from "react";
import { getMe } from "../api";
const Profile = ({ userObj, setToken, setIsLoggedIn, setUserObj }) => {
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

  const sentMessages = userObj.messages
    ? userObj.messages.map((message, i) => {
        if (userObj.username === message.fromUser.username) {
          return (
            <div key={i} className="Message">
              <h3 className="sentmsg">(Sent by Me)</h3>
              <h3>{message.post.title}</h3>
              <p>{message.content}</p>
            </div>
          );
        }
      })
    : null;
  const receivedMessages = userObj.messages
    ? userObj.messages.map((message, i) => {
        if (userObj.username !== message.fromUser.username) {
          return (
            <div key={i} className="Message">
              <h3>From: {message.fromUser.username}</h3>
              <h3>{message.post.title}</h3>
              <p>{message.content}</p>
            </div>
          );
        }
      })
    : null;
  return (
    <div>
      <h3 className="ProfileTitle">Messages From Me</h3>
      {sentMessages}
      <div>
        <h3 className="ProfileTitle">Messages To Me</h3>
        {receivedMessages}
      </div>
    </div>
  );
};

export default Profile;