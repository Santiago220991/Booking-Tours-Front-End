import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LoginAPI } from '../redux/user/userAPI';
import '../styling/login.css';

const CriptoJS = require('crypto-js');

const Login = () => {
  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [value, setValue] = useState({ email: '', password: '' });

  const onChange = (e) => {
    const newValue = { ...value, [e.target.id]: e.target.value };
    setValue(newValue);
  };

  const Login = (e) => {
    e.preventDefault();
    dispatch(LoginAPI(value));
  };

  useEffect(() => {
    if (user.length > 0) {
      const cypherText = CriptoJS.AES.encrypt(JSON.stringify(user[0]), 'user').toString();
      localStorage.setItem('user', cypherText);
      navigate('/');
    }
  }, [navigate, user]);

  useEffect(() => {
    document.title = 'Login';
  }, []);

  return (
    <div className="login">
      <h1>Welcome!!!</h1>
      <form className="login-form" onSubmit={Login}>
        <input type="email" id="email" placeholder="Email" value={value.email} onChange={onChange} required />
        <input type="password" id="password" placeholder="Password" value={value.password} onChange={onChange} required />
        <button type="submit">Login</button>
      </form>
      <div className="aditional-links">
        <h3>Don&apos;t you have an account yet?</h3>
        <p>Just create one!</p>
        <Link to="/SignUp">Create Account</Link>
      </div>
    </div>
  );
};

export default Login;
