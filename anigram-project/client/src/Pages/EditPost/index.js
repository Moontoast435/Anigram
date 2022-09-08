import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

const EditPost = () => {
  const [description, setDescription] = useState('');
  const [username, setUserName] = useState('');
  const [image_url, setImageUrl] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/posts/api/post/${id}`).then((res) => {
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
        'Content-Type': 'multipart/form-data',
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    };
    const data = {
      description: description,
      username: username,
      image_url: image_url,
    };
    axios
      .put(`http://127.0.0.1:8000/posts/api/post/${id}/update`, data, config)
      .then(
        setTimeout(() => {
          navigate('/feed');
        }, 500)
      );
  }

  return (
    <div className="w-screen h-full flex flex-col justify-center items-center mt-16">
      <h2 className="text-2xl font-bold">User Details</h2>
      <form className="w-[50%] h-full flex flex-col mt-2">
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-white/10 outline-none font-normal border border-zinc-400 py-6 pl-6 mt-4"
          type="text"
          placeholder="Enter your name"
        />

        <input
          type="file"
          onChange={(event) => {
            setImageUrl(event.target.files[0]);
          }}
        />

        <button
          className="bg-teal-600 outline-none font-bold border text-white border-zinc-400 py-4 pl-4 mt-4"
          type="submit"
          onClick={Update}
        >
          UPDATE POST
        </button>
      </form>
    </div>
  );
};

export default EditPost;
