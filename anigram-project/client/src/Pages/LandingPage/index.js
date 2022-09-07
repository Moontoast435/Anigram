// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import React from "react";
import "./styles.css";
import icon from "../../images/icon.png";

const LandingPage = () => {
  return (
    <div className="homeContainer">
      <div className="homeWrapper">
        <img src={icon} alt="anigram icon" />
        <h1>anigram</h1>
        <p>
          Celebrating animals while also helping animals in need find a forever
          home.
        </p>
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
