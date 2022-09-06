import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSelector } from "react-redux";
import { logout } from '../actions/auth';


const Navbar = ({isAuthenticated, logout}) => {
  
    const authLinks = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" exact="true" to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" exact="true" to="/chats">Chats</NavLink>
            </li>
            <li className="nav-item">
                <a className="nav-link " aria-current="page" onClick={() => logout()} exact={true} href='/'>Logout</a>
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
                        <NavLink className="nav-link " aria-current="page" exact="true" to="/">Home</NavLink>
                    </li>
                    { isAuthenticated ? authLinks : guestLinks }
                </ul>
            </div>
        </div>
</nav>
    )
}

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});


export default connect(mapStateToProps, { logout })(Navbar);
