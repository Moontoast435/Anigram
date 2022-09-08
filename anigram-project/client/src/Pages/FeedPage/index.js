import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
import SearchPage from '../SearchPage';
import Cookies from 'js-cookie';

const FeedPage = () => {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  function handleClick() {
    navigate('/create');
  }

  const username = useSelector((state) => state.profile.username);
  console.log(username);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    fetch('http://127.0.0.1:8000/posts/api/post')
      .then((response) => response.json())
      .then((data) => setPosts(data));
  };
  const deletePost = (id) => {
    fetch(`http://127.0.0.1:8000/posts/api/post/${id}/delete`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        getPosts();
      });
    });
  };
  const postsDisplay = posts.map((post, i) => {
    return (
      <div>
        <div className="posts-display-board" role="posts" key={i}>
          {/* <p>{post.title}</p> */}
          {post.username == username ? (
            <Link to={`/edit/post/${post.id}`}>Edit</Link>
          ) : null}
          {post.username == username ? (
            <button onClick={() => deletePost(post.id)}>Delete Post</button>
          ) : null}
          Posted By: {post.username}
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
        <SearchPage />
        {postsDisplay}
        <button onClick={handleClick}>Make a post</button>
      </div>
    </>
  );
};

export default FeedPage;
