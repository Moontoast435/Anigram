import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../../actions/auth";
import CSRFToken from "../../components/CSRFToken";
import "./styles.css";
import icon from "../../images/icon.png";

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    re_password: "",
  });
  const [accountCreated, setAccountCreated] = useState(false);

  const navigate = useNavigate();

  const { username, password, re_password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password === re_password) {
      register(username, password, re_password);
      setAccountCreated(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else if (accountCreated) {
      navigate("/login");
    }
  }, [accountCreated]);
  return (
    <div className="registerContainer">
      <div className="registerWrapper">
        <img src={icon} alt="anigram icon" />
        <h1> Register for an Account </h1>
        {/* <p> Create an account to join in on the Anigram fun.</p> */}
        <form onSubmit={(e) => onSubmit(e)}>
          <CSRFToken />
          <div className="form">
            <label className="form-label">Username: </label>
            <input
              className="form-control"
              type="text"
              placeholder="Username*"
              name="username"
              onChange={(e) => onChange(e)}
              value={username}
              required
            />
          </div>
          <div className="form">
            <label className="form-label mt-3">Password: </label>
            <input
              className="form-control"
              type="password"
              placeholder="Password*"
              name="password"
              onChange={(e) => onChange(e)}
              value={password}
              minLength="6"
              required
            />
          </div>
          <div className="form">
            <label className="form-label mt-3">Confirm Password: </label>
            <input
              className="form-control"
              type="password"
              placeholder="Confirm Password*"
              name="re_password"
              onChange={(e) => onChange(e)}
              value={re_password}
              minLength="6"
              required
            />
          </div>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
