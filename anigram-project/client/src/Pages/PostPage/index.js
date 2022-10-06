import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import "./styles.css";

const PostPage = () => {
  axios.defaults.withCredentials = true;
  let navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [image_url, setImageUrl] = useState(null);

  const username = useSelector((state) => state.profile.username);
  // console.log(username);
  // console.log('hey there');

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const post = { description, image_url, username };
  //   await fetch('https://anigram-application.herokuapp.com/posts/api/post/create', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-CSRFToken': Cookies.get('csrftoken'),
  //     },
  //     body: JSON.stringify(post),
  //   });
  //   console.log(post);
  //   navigate('/main');
  //   console.log(username);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let form_data = new FormData();
    form_data.append("description", description);
    form_data.append("image_url", image_url);
    form_data.append("username", username);

    let desc = document.forms["Form"]["description"].value;
    let image = document.getElementById("img").value;

    if ((desc == null || desc == "", image == null || image == "")) {
      alert("Please Fill All Required Field");
      return false;
    }

    console.log(username);
    console.log(form_data);
    await fetch(`http://127.0.0.1:8000/posts/api/post/create`, {
      method: "POST",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: form_data,
    });
    navigate("/feed");
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const post = { description, image_url };

  //   await axios.post('https://anigram-application.herokuapp.com/posts/api/post/create', {
  //     // method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'X-CSRFToken': Cookies.get('csrftoken'),
  //     },
  //     body: JSON.stringify(post),
  //     // body: JSON.stringify({ data: base64EncodedImage }),
  //   });
  //   console.log(post.description);
  //   console.log(image_url);
  //   // console.log(username1);

  //   navigate('/main');
  // };

  return (
    <div className="postContainer">
      <div className="postWrapper">
        <form name="Form">
          <label>
            <input
              type="file"
              id="img"
              required
              onChange={(event) => {
                setImageUrl(event.target.files[0]);
              }}
            />
            description
            <input
              type="text"
              required
              value={description}
              name="description"
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </form>
        <button onClick={handleSubmit}>Create</button>
      </div>
    </div>
  );
};

export default PostPage;
