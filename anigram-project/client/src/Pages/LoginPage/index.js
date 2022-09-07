import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import CSRFToken from "../../components/CSRFToken";
import "./styles.css";
import icon from "../../images/icon.png";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated]);

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <img src={icon} alt="anigram icon" />
        <h1> Sign into your anigram </h1>
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
            <label className="form-label">Password: </label>
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
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
