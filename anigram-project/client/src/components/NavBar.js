import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useSelector } from "react-redux";
import { logout } from '../actions/auth';


const Navbar = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    console.log(isAuthenticated);
    const authLinks = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/dashboard">Dashboard</NavLink>
            </li>
            <li className="nav-item">
                <a className="nav-link " aria-current="page" onClick={() => logout} href='/'>Logout</a>
            </li>
        </>
    );

    const guestLinks = (
        <>
            <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link " aria-current="page" to="/register">Register</NavLink>
            </li>
        </>
    )
    return (
    <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
            <Link className="navbar-brand" exact to="/">Anigram</Link>
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
                        <NavLink className="nav-link " aria-current="page" exact to="/">Home</NavLink>
                    </li>
                    { isAuthenticated ? authLinks : guestLinks }
                </ul>
            </div>
        </div>
</nav>
    )
}

// const mapStateToProps = state => ({
//     isAuthenticated : state.auth.isAuthenticated
// });


export default (Navbar);