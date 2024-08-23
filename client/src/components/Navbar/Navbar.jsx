import React, { useEffect, useState } from 'react'
import logo from '../../assets/logoCode.png';
import './styles.css';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const[login,setLogin]=useState(false);
    const user=JSON.parse(localStorage.getItem('profile'));
    const navigate=useNavigate();
    useEffect(()=>{
        if(user){
            setLogin(true)
        }
    },[])
    const handleLogout=()=>{
        localStorage.removeItem('profile');
        navigate('/')
    }
  return (
    <>
    <div className='navbar'>
        <div className='app-icon'>
          <img src={logo} alt="logo" />
          <h1 className='magic'>CodeAlong</h1>
        </div>
        <div>
           <button href="#login" className="menubuts" onClick={handleLogout}>{!login?'Login/SignUp':'Logout'}</button>
           <button href='#join' className="menubuts" onClick={() => {if(login) window.open('/', '_blank')}}>Join Room</button>   
           <button className="menubuts">About Us</button> 
        </div>   
    </div>
    <div className="navgrad"></div>
    </>
  )
}

export default Navbar
