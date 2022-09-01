import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const HomePage = () => {
    const [posts , setPosts] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/post')
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

    return (
        <>
        
        <div className="posts-container" role="posts-display">{postsDisplay}</div>
        </>
    )
}

export default HomePage