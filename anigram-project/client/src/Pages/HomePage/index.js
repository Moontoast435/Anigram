import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const HomePage = () => {
    const [posts , setPosts] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://127.0.0.1:8000/posts/api/post')
            .then((response) => response.json())
            .then((data) => setPosts(data));
    }, []);

    
    const postsDisplay = posts.map((post, i ) => {
        return (
            <div className="posts-display-board" role="posts" key={i}>
                <p>Post: {i + 1}</p>
                <p>Title:{post.title}</p>
                <p>Message:{post.body}</p>  
            </div>
        )
    })

    const goToLogin = () => {
        navigate('/login')
    }

    return (
        <>
        
        <div className="posts-container" role="posts-display">{postsDisplay}</div>
        <button onClick={goToLogin}></button>
        </>
    )
}

export default HomePage