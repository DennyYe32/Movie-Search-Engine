// src/pages/RegisterPage/SignUp.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import eye1 from '../../assets/eye1.png'
import eye2 from '../../assets/eye2.png'
import './SignUp.css';

import Validation from '../LoginValidation';

function SignUp() {
   const [username, setUsername] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 // const[values, setValues] = useState({
 //   username: '',
 //   email: '',
 //   password: ''

  //})

  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const registerUser = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }



    const user = {
      username: username,
      email: email,
      password: password,
    };

    localStorage.setItem('user', JSON.stringify(user));

    alert("Registration successful! You can now log in.");
    navigate('/login');
  };

  return (
    <div>
      <Header />
      <div className="register-container">
        <div className="register-form-card">
          <h2>Join Us!</h2>
          <h3>Create your account</h3>

          <form className="register-form" onSubmit={registerUser}>
            <div className="input-group">
              <label htmlFor="new-username">User name</label>
              <input
                type="text"
                id="new-username"
                placeholder="Choose a user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="new-email">Email</label>
              <input
                type="email"
                id="new-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group password-container">
              <label htmlFor="new-password">Password</label>
              <div className='textImgDiv'>
              <input
                type={showPassword ? "text" : "password"}
                id="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <img
                src={showPassword ? eye2 : eye1}
                alt={showPassword ? "Hide password" : "Show password"}
                className="toggle-password"
                onClick={togglePasswordVisibility}
              />
              </div>
              
            </div>

            <div className="input-group password-container">
              <label htmlFor="confirm-password">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <img
                src={showConfirmPassword ? eye2 : eye1}
                alt={showConfirmPassword ? "Hide password" : "Show password"}
                className="toggle-password"
                onClick={toggleConfirmPasswordVisibility}
              />
            </div>
            
            <button type="submit" className="register-button">Register</button>
          </form>
          
          <div className="login-link">
            Already have an account? <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
