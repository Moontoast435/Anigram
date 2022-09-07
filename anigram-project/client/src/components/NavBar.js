import React from "react";
import { Outlet, Link, NavLink} from "react-router-dom";
import { logout } from '../actions/auth'
import { connect } from 'react-redux';

const NavBar = (isAuthenticated, logout) => {
  const authLinks = (
    <>
        <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" exact="true" to="/profile">Profile</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" exact="true" to="/chats">Chats</NavLink>
        </li>
        <li className="nav-item">
            <a className="nav-link " aria-current="page" onClick={() => logout()} exact={true} href='/'>Logout</a>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" exact="true" to="/create">Create post</NavLink>
        </li>
        
    </>
);

const guestLinks = (
    <>
        <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" exact="true" to="/login">Login</NavLink>
        </li>
        <li className="nav-item">
            <NavLink className="nav-link " aria-current="page" exact="true" to="/register">Register</NavLink>
        </li>
        
    </>
)

  return (
    <>
      <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" exact="true" to="/">Anigram</Link>
            <button className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse"
             data-bs-target="#navbarNav" 
             aria-controls="navbarNav" 
             aria-expanded="false" 
             aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link " aria-current="page" exact="true" to="/feed">Home</NavLink>
                    </li>
                    { isAuthenticated ? authLinks : guestLinks }
                </ul>
            </div>
        </div>
      </nav>
        <Outlet />
      </div>
      <footer>test</footer>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
});
export default connect(mapStateToProps, { logout })(NavBar) ;