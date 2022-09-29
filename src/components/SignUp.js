import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { postUserApi } from '../redux/user/userAPI';
import '../styling/SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createUserHandeler = (event) => {
    event.preventDefault();
    if (!name || !email || !password) return;
    const user = {
      name,
      email,
      password,
    };
    dispatch(postUserApi(user));
    setName('');
    setEmail('');
    setPassword('');
    navigate('/Login');
  };

  useEffect(() => {
    document.title = 'Register';
  }, []);

  return (
    <div className="signup">
      <h1>Sign Up</h1>
      <form className="signup-form" onSubmit={createUserHandeler}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" value="add-tour">Register</button>
      </form>
      <div className="aditional-links">
        <h3>Do you have an account?</h3>
        <p>Just Login!</p>
        <Link to="/Login">Login</Link>
      </div>
    </div>
  );
};

export default SignUp;
