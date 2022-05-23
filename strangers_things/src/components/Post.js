import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post, isLoggedIn, userObj }) => {
  return (
    <div className="SinglePost" key={post._id}>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
      <p>Price {post.price}</p>
      <p>Seller {post.author.username}</p>
      <p>Location {post.location}</p>
      {isLoggedIn && post.author._id == userObj._id ? (
        <Link to={`/posts/view/${post._id}`}>
          <button>View</button>
        </Link>
      ) : null}
      {isLoggedIn && post.author._id != userObj._id ? (
        <Link to={`/posts/${post._id}/messages`}>
          <button>Send message</button>
        </Link>
      ) : null}
    </div>
  );
};

export default Post;