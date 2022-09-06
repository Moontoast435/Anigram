import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  //   const [post, setPost] = useState({
  //     body: 'qqq',
  //   });
  const username = useSelector(state => state.auth.username);

  axios.defaults.withCredentials = true;
  let navigate = useNavigate();

  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState(null);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const post = { description, image_url };
  //   fetch(`/api/post/create`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(post),
  //   });
  //   navigate('/');
  // };
  const handleSubmit = () => {
    const uploadData = new FormData();
    uploadData.append('description', description);
    uploadData.append('image_url', image_url);
    uploadData.append('username', username);
    fetch('http://127.0.0.1:8000/api/post/create', {
      method: 'POST',
      body: uploadData,
    });
    setTimeout(() => {
      navigate('/');
    }, 30);
  };

  return (
    <div>
      <form>
        <label>
          Enter your name:
          <input
            type="text"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="file"
            onChange={(event) => {
              setImageUrl(event.target.files[0]);
            }}
          />
        </label>
      </form>
      <button onClick={() => handleSubmit()}>Create</button>
    </div>
  );
};

export default CreatePost;
