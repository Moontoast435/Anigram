import React from "react";
import { Outlet, Link, NavLink } from "react-router-dom";
import { logout } from "../actions/auth";
import { connect } from "react-redux";
import {
  AiOutlineHome,
  AiOutlinePlusCircle,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai";
import { BsChatDots, BsList } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import "./navstyles.css";

const NavBar = (isAuthenticated, logout) => {
  const authLinks = (
    <>
      <li className="list">
        <NavLink aria-current="page" exact="true" to="/chats">
          <span className="icon">
            <BsChatDots />
          </span>
        </NavLink>
      </li>
      <li className="list">
        <NavLink aria-current="page" exact="true" to="/create">
          <span className="icon">
            <AiOutlinePlusCircle />
          </span>
        </NavLink>
      </li>
      <li className="list">
        <NavLink aria-current="page" exact="true" to="/profile">
          <span className="icon">
            <CgProfile />
          </span>
        </NavLink>
      </li>
      <li className="list">
        <a aria-current="page" onClick={() => logout()} exact={"true"} href="/">
          <span className="icon">
            <AiOutlineLogout />
          </span>
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="list">
        <NavLink aria-current="page" exact="true" to="/login">
          <span className="icon">
            <AiOutlineLogin />
          </span>
        </NavLink>
      </li>
      <li className="list">
        <NavLink aria-current="page" exact="true" to="/register">
          <span className="icon">
            <AiOutlineLogout />
          </span>
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div>
        <Outlet />
      </div>
      <div className="navContainer">
        <div className="navWrapper">
          <ul>
            <li className="list">
              <NavLink aria-current="page" exact="true" to="/feed">
                <span className="icon">
                  <AiOutlineHome />
                </span>
              </NavLink>
            </li>
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { logout })(NavBar);
