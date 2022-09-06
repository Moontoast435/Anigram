import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const MainPage = () => {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  function handleClick() {
    navigate('/create');
  }

  const username = useSelector((state) => state.auth.username);
  console.log(username);
  console.log('hey there');

  // const searchHandle = async (e) => {
  //   let key = e.target.value;
  //   let result = await fetch(`http://127.0.0.1:8000/search?search=${key}`);

  //   result = await result.json();
  //   console.log(result);

  //   if (result) {
  //     console.log(result);
  //     // setPosts(result);
  //   }
  // };
  useEffect(() => {
    fetch('http://127.0.0.1:8000/posts/api/post')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const postsDisplay = posts.map((post, i) => {
    return (
      <div>
        <div className="posts-display-board" role="posts" key={i}>
          {/* <p>{post.title}</p> */}
          
          <p>
            Image: <img src={post.image_url} />
          </p>
          <p>Description: {post.description}</p>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="posts-container" role="posts-display">
        {/* <input type="" onChange={searchHandle} /> */}
        Posted By: {username}
        {postsDisplay}
        <button onClick={handleClick}>Make a post</button>
      </div>
    </>
  );
};

export default MainPage;
