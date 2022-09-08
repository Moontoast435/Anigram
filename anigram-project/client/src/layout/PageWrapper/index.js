import React, { useEffect } from "react";
import NavBar from "../../components/navBar";
import { checkAuthenticated } from "../../actions/auth";
import { connect } from "react-redux";
import { load_user } from "../../actions/profile";

const PageWrapper = ({ children, checkAuthenticated, load_user }) => {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, []);

  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default connect(null, { checkAuthenticated, load_user })(PageWrapper);
