import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const MainPage = () => {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  function handleClick() {
    navigate('/create');
  }

  const searchHandle = async (e) => {
    let key = e.target.value;
    let result = await fetch(`https://anigram-application.herokuapp.com/search?search=${key}`);

    result = await result.json();
    console.log(result);

    if (result) {
      console.log(result);
      // setPosts(result);
    }
  };
  useEffect(() => {
    fetch('https://anigram-application.herokuapp.com/api/post')
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
        <input type="" onChange={searchHandle} />

        {postsDisplay}
        <button onClick={handleClick}>Make a post</button>
      </div>
    </>
  );
};

export default MainPage;