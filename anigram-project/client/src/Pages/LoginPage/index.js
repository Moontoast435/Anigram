import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import CSRFToken from '../../components/CSRFToken'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    })
    
    const navigate = useNavigate();

    const { username, password } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    
    const onSubmit = e => {
        e.preventDefault();
        login(username, password);
     };
    
    useEffect(() => {
    if (isAuthenticated) {
        navigate('/dashboard');
    }
}, [isAuthenticated])

return (
    <div className='container mt-5'>
        <h1> Sign into your account </h1>
        <p> Sign into your Anigram!</p>
        <form onSubmit={e => onSubmit(e)}>
            <CSRFToken  />
            <div className='form-group'>
                <label className='form-label'>Username: </label>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Username*'
                    name='username'
                    onChange={e => onChange(e)}
                    value={username}
                    required
                />
            </div>
            <div className='form-group'>
                <label className='form-label mt-3'>Password: </label>
                <input
                    className='form-control'
                    type='password'
                    placeholder='Password*'
                    name='password'
                    onChange={e => onChange(e)}
                    value={password}
                    minLength='6'
                    required
                />
            </div>
            <button className='btn btn-primary mt-3' type='submit'>Login</button>
        </form>
        <p className='mt-3'>
            Don't have an account? <Link to='/register'>Sign up</Link>
        </p>
    </div>
);
};

const mapStateToProps = state => ({
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
