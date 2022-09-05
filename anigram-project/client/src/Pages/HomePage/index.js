import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import React from "react";

const Home = () => {

return (
    <div className='container'>
        <div className='mt-5 p-5 bg-light'>
            <h1 className="display-4">Welcome to Anigram</h1>
            <p className='lead'>
                This is a wonderful application that celebrates animals while also helping lonely animals find a forever home.
            </p>
            <hr className='my-4' />
            <p> Click the button below to log in.</p>
            <Link className='btn btn-primary btn-lg' to='/login'>Login</Link>
        </div>
    </div>
    
)
}

export default Home