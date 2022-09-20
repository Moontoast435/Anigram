import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchPage from "../SearchPage";
import Cookies from "js-cookie";
import "./styles.css";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { TiDeleteOutline } from "react-icons/ti";
import { setProfileUser } from "../../actions/selected";
import axios  from 'axios';
const FeedPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([]);

  // function handleClick() {
  //   navigate("/create");
  // }

  const username = useSelector((state) => state.profile.username);
  console.log(username);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    fetch("https://anigram-application.herokuapp.com/posts/api/post")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  };
  const deletePost = (id) => {
    fetch(`https://anigram-application.herokuapp.com/posts/api/post/${id}/delete`, {
      method: "DELETE",
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        getPosts();
      });
    });
  };

  const navigateToView = (username) =>{
    dispatch(setProfileUser(username))
    navigate('../view')
  } 

  const postsDisplay = posts.map((post, i) => {
    return (<>
      <div>
        <div role="posts" key={i}>
          <div className="feedPost">
            <div className="feedUser">
              <p onClick={() => navigateToView(post.username)}>{post.username}</p>  
              {post.username == username ? (
                <button onClick={() => deletePost(post.id)}>
                  <span className="icon">
                    <TiDeleteOutline />
                  </span>
                </button>
              ) : null}
            </div>
            <img src={post.image_url} />
            <div className="feedDesc">
              <div className="feedUser2">
              <p>{post.username}</p>
                {post.username == username ? (
                  <Link to={`/edit/post/${post.id}`}>
                    <span className="icon">
                      <BiDotsHorizontalRounded />
                    </span>
                  </Link>
                ) : null}
              </div>
              <p>{post.description}</p>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  });

  return (
    <>
      <div className="feedContainer" role="posts-display">
        <div className="feedWrapper">
          <SearchPage setPosts={setPosts}/>
          {postsDisplay}
        </div>
      </div>
    </>
  );
};

export default FeedPage;
