import {React,useEffect, useRef, } from 'react';
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import  initSocket from '../../socket.js';

const Room = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const socketRef = useRef(null);
    const { roomId } = useParams();
    console.log(roomId);
    useEffect(() => {
      const init = async () => {
          try {
              socketRef.current = await initSocket();
              socketRef.current.on("connect_error", (err) => {
                console.log(err.message,err.description);
                console.log(err.description);
              });
          } catch (err) {
              console.error('Socket connection error:', err);
              navigate('/');
          }
      };

      init();

  }, [roomId, location.state?.username, navigate]);

  return (
    <div>
      Welcome to Room {location.state.username}
    </div>
  )
}

export default Room
