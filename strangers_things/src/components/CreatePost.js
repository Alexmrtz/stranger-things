import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { newPost } from "../api";


const CreatePost = ({ posts, setPosts }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [deliver, setDeliver] = useState(false);
    const [checked, setChecked] = useState(false);
  
    let history = useHistory();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const postDetailsObj = { title, description, location, price, deliver };
      const response = await newPost(
        postDetailsObj,
        localStorage.getItem("token")
      );
      const newPosts = [response.data.post, ...posts];
      setPosts([...posts, response.data.post]);
      history.push("/posts");
      alert("Post added");
    };
  
    return (
      <div className="CreatePost">
        <h1>Add Post</h1>
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
          <label>ready to deliver?</label>
          <br></br>
          <button type="submit">CREATE</button>
        </form>
      </div>
    );
  };




















export default CreatePost;