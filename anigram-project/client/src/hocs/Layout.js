import React, { useEffect } from 'react';
import Navbar from '../components/NavBar';
import { checkAuthenticated } from '../actions/auth';
import { connect } from 'react-redux';


const Layout = ({ children, checkAuthenticated }) => {

    useEffect(() => {
        checkAuthenticated();
    }, []);

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default connect(null, { checkAuthenticated })(Layout);