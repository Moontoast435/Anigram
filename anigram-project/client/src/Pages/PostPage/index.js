import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import { useSelector } from 'react-redux';
 
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
  const handleSubmit = async (e) => {
    // e.preventDefault();

    let form_data = new FormData();
    form_data.append('description', description);
    form_data.append('image_url', image_url);
    form_data.append('username', username);
    console.log(username)
    console.log(form_data);
    await fetch(`http://127.0.0.1:8000/posts/api/post/create`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: form_data,
    });
    navigate('/main');
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
          <input type='hidden' name ='username' value={username}/>
        </label>
      </form>
      <button onClick={() => handleSubmit()}>Create</button>
    </div>
  );
};

export default CreatePost;
