import React, { useState } from 'react';
import logo from '../../assets/logoCode.png';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as api from '../../api/api';

const Auth = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSwitchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const signin = async (formData, navigate) => {
    try {
      const { data } = await api.signIn(formData);
      console.log(data);
      localStorage.setItem('profile', JSON.stringify(data));
      navigate('/home');
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  const signup = async (formData, navigate) => {
    console.log(formData)
    try {
      const { data } = await api.signUp(formData);
      console.log(data);
      localStorage.setItem('profile', JSON.stringify(data));
      navigate('/home');
    } catch (error) {
      alert(error?.response?.data?.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignUp) {
      signup(formData, navigate);
    } else {
      signin(formData, navigate);
    }
  };

  return (
    <div className='container'>
      <form className='formWrapper' onSubmit={handleSubmit}>
        <div className='icon'>
          <img src={logo} alt="logo" />
          <h1 className='magic'>CodeAlong</h1>
        </div>
        <h5 style={{ margin: '1vh', fontSize: '3vh', background: 'transparent' }}>
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </h5>
        {isSignUp && (
          <>
            <input
              type="text"
              id="fullName"
              className='inputBox'
              name="fullName"
              placeholder='Full Name'
              value={formData.fullName}
              onChange={handleChange}
            />
          </>
        )}
        <input
          type="email"
          id="email"
          className='inputBox'
          name="email"
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className='inputBox'
          id="password"
          name="password"
          placeholder='Password'
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          required
        />
        <div onClick={handleShowPassword}>
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
        {isSignUp && (
          <div className="inputGroup">
            <input
              type="password"
              className='inputBox'
              id="confirmPassword"
              name="confirmPassword"
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit" className="button">
          {isSignUp ? 'Sign Up' : 'Sign In'}
        </button>
        <a onClick={handleSwitchMode}>
          {isSignUp ? 'Already have an account? Sign In' : 'Don\'t have an account? Sign Up'}
        </a>
      </form>
    </div>
  );
};

export default Auth;
