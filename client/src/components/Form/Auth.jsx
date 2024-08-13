import React, { useState } from 'react';
import logo from '../../assets/logoCode.png';
import './styles.css';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as api from '../../api/api';
import toast from 'react-hot-toast';

const Auth = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(true);
    const [roomId,setRoomId]=useState('');
    const [username,setUsername]=useState('');

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

  const createRoom=async(e)=>{
    e.preventDefault();
    try {
        const {data} = await api.createRoom();
        console.log(data)
        setRoomId(data.roomId);
        toast.success('Created a new room');
    } catch (err) {
        toast.error('Could not create a new room');
    }  
  }

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error('ROOM ID & username are required');
      return;
    }
    alert("Joining")
  };

  const handleInputEnter = (e) => {
    if (e.code === 'Enter') 
      joinRoom();
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
            <input
              type="text"
              id="fullName"
              className='inputBox'
              name="fullName"
              placeholder='Full Name'
              value={formData.fullName}
              onChange={handleChange}
            />         
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
     
      <div className="formWrapper">
      <h2 className='magic'>Join/Create Room</h2>
        <h4 className="mainLabel">Paste invitation Room Id</h4>
          <div className="inputGroup">
            <input
              type="text"
              className="inputBox"
              placeholder="ROOM ID"
              onChange={(e) => {setRoomId(e.target.value)}}
              value={roomId}
              onKeyUp={handleInputEnter}
            />
            <input
              type="text"
              className="inputBox"
              placeholder="USERNAME"
              onChange={(e) => {setUsername(e.target.value)}}
              value={username}
              onKeyUp={handleInputEnter}
              required
            />
            <button className="button" onClick={joinRoom}>
              Join
            </button>
            <span className="createInfo">
              Don't have an invite ?  &nbsp;
            <a onClick={createRoom}
              href=""
              className="createNewBtn"
            >
            Create own Room
            </a>
            </span>
          </div>
      </div>
    </div>  
  );
};

export default Auth;
