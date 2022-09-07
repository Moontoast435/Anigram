import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import "./styles.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";

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
        <div role="posts" key={i}>
          <div className="feedPost">
            <div className="feedUser">
              <p>{post.username}</p>
              {post.username == username ? (
                <Link to={`/edit/post/${post.id}`}>
                  <span className="icon">
                    <BiDotsHorizontalRounded />
                  </span>
                </Link>
              ) : null}
            </div>
            <img src={post.image_url} />
            <div className="feedDesc">
              <p>{post.username}</p>
              <p>{post.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="feedContainer" role="posts-display">
        <div className="feedWrapper">{postsDisplay}</div>
      </div>
    </>
  );
};

export default FeedPage;
