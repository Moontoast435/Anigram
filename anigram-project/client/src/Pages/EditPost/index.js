import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import "./styles.css";

const EditPost = () => {
  const [description, setDescription] = useState("");
  const [username, setUserName] = useState("");
  const [image_url, setImageUrl] = useState("");
  const { id } = useParams();

  useEffect(() => {
    axios.get(`https://anigram-application.herokuapp.com/posts/api/post/${id}`).then((res) => {
      setDescription(res.data.description);
      setUserName(res.data.username);
      setImageUrl(res.data.image_url);
    });
  }, []);

  const navigate = useNavigate();

  function Update(e) {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    };
    const data = {
      description: description,
      username: username,
      image_url: image_url,
    };
    axios
      .put(`https://anigram-application.herokuapp.com/posts/api/post/${id}/update`, data, config)
      .then(
        setTimeout(() => {
          navigate("/feed");
        }, 500)
      );
  }

  return (
    <div className="editContainer">
      <div className="editWrapper">
        <p>edit post</p>
        <form>
          <input
            type="file"
            onChange={(event) => {
              setImageUrl(event.target.files[0]);
            }}
          />
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="description"
          />
        </form>
        <button type="submit" onClick={Update}>
          UPDATE POST
        </button>
      </div>
    </div>
  );
};

export default EditPost;
