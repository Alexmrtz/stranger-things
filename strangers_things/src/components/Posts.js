import React, { useState } from "react";
import { Link } from "react-router-dom";
import Post from "./Post";

const Posts = (props) => {
  const { posts, isLoggedIn, userObj } = props;
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="MainPosts">
      <h1>Posts</h1>
      <input
        className="PostInputBar"
        type="search"
        placeholder="search posts"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      ></input>

      {isLoggedIn ? (
        <Link className="PostInput" to="/CreatePost">
          <button>add Post</button>
        </Link>
      ) : null}
      {posts
        .filter((post) => {
          if (searchTerm == "") {
            return post;
          } else if (
            post.location.includes(searchTerm) ||
            post.title.includes(searchTerm) ||
            post.price.includes(searchTerm) ||
            post.author.username.includes(searchTerm)
          ) {
            return post;
          }
        })
        .map((post, i) => {
          return (
            <Post
              post={post}
              isLoggedIn={isLoggedIn}
              userObj={userObj}
              key={i}
            />
          );
        })}
    </div>
  );
};

export default Posts;