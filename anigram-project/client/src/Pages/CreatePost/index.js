import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
const CreatePost = () => {
  axios.defaults.withCredentials = true;
  let navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [image_url, setImageUrl] = useState(null);
  const handleSubmit = (event) => {
    event.preventDefault();
    const post = { description, image_url };
    fetch(`http://127.0.0.1:8000/posts/api/post/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: JSON.stringify(post),
    });
    navigate('/main');
  };
  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   const post = { description, image_url };

  //   await axios.post('http://127.0.0.1:8000/posts/api/post/create', {
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
      <button onClick={handleSubmit}>Create</button>
    </div>
  );
};
export default CreatePost;
