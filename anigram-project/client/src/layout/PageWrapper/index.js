import React from "react";
import { Outlet } from "react-router-dom";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineLogout,
} from "react-icons/ai";
import { BsChatDots } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import "./styles.css";

const PageWrapper = () => {
  return (
    <>
      {/* <div>
        <Outlet />
      </div>
      <div className="navContainer">
        <div className="navWrapper">
          <ul>
            <li className="list">
              <a href="#">
                <span className="icon">
                  <AiOutlineHome />
                </span>
                <span className="text">Feed</span>
              </a>
            </li>
            <li className="list">
              <a href="#">
                <span className="icon">
                  <BsChatDots />
                </span>
                <span className="text">Chat</span>
              </a>
            </li>
            <li className="list">
              <a href="#">
                <span className="icon">
                  <AiOutlinePlusCircle />
                </span>
                <span className="text">Post</span>
              </a>
            </li>
            <li className="list">
              <a href="#">
                <span className="icon">
                  <CgProfile />
                </span>
                <span className="text">Profile</span>
              </a>
            </li>
            <li className="list">
              <a href="#">
                <span className="icon">
                  <AiOutlineLogout />
                </span>
                <span className="text">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default PageWrapper;
