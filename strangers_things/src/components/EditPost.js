import React, { useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { updatePost } from "../api";
import Posts from "./Posts";

const EditPost = () => {
  const propsImport = useLocation();
  const post = propsImport.state.post;
  const setPosts = propsImport.state.setPosts;
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [price, setPrice] = useState(post.price);
  const [location, setLocation] = useState(post.location);
  const [deliver, setDeliver] = useState(post.deliver);
  const [checked, setChecked] = useState(post.checked);
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(post);
    const postDetailsObj = { title, description, location, price, deliver };
    console.log(postDetailsObj);
    const response = await updatePost(
      postDetailsObj,
      post._id,
      localStorage.getItem("token")
    );
    console.log(response);
    history.push("/posts");
    alert("Updated Post");
  };

  return (
    <div className="CreatePost">
      <h1>Update post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Price*"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
          }}
        ></input>
        <br></br>
        <input
          type="checkbox"
          value={deliver}
          onChange={(e) => {
            setChecked(!checked);
            setDeliver(
              e.target.value === "false"
                ? (e.target.value = "true")
                : (e.target.value = "false")
            );
          }}
        ></input>
        <label>Willing to deliver?</label>
        <br></br>

        <button type="submit">UPDATE</button>
      </form>
    </div>
  );
};
export default EditPost;