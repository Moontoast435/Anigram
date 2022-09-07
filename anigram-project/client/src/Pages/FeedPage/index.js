import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import icon from "../../images/icon2.png";

const FeedPage = () => {
  let navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  // function handleClick() {
  //   navigate("/create");
  // }

  const username = useSelector((state) => state.profile.username);
  console.log(username);

  // const searchHandle = async (e) => {
  //   let key = e.target.value;
  //   console.log(key);
  //   let result = await fetch(
  //     `http://127.0.0.1:8000/posts/api/post?search=${key}`
  //   );

  //   result = await result.json();
  //   console.log(result);

  //   if (result) {
  //     console.log(result);
  //     // setPosts(result);
  //   }
  // };
  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts/api/post")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const postsDisplay = posts.map((post, i) => {
    return (
      <div>
        <div className="posts-display-board" role="posts" key={i}>
          {/* <p>{post.title}</p> */}
          {post.username == username ? (
            <Link to={`/edit/post/${post.id}`}>Edit</Link>
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
      <div className="feedContainer" role="posts-display">
        <div className="feedHeader">
          <img src={icon} alt="anigram icon" />
        </div>
        <h1>anigram</h1>
        <div className="feedWrapper">
          {/* <input type="" onChange={searchHandle} /> */}

          {postsDisplay}
          {/* <button onClick={handleClick}>Make a post</button> */}
        </div>
      </div>
    </>
  );
};

export default FeedPage;
