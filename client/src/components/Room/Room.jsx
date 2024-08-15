import {React,useEffect, useRef, } from 'react';
import { useParams,useNavigate,useLocation } from 'react-router-dom';
import  initSocket from '../../socket.js';
import Client from './Client.jsx';
import './styles.css';

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

  const copyRoomId=()=>{

  }
  const leaveRoom=()=>{

  }
  return (
    <div className='room'>
            <div className='mainWrap'>
                <div className='aside'>
                    <div className='asideInner'>
                        <h3>Connected</h3>
                        <div className='clientsList'>
                            <Client username={location.state?.username}></Client>
                        </div>
                    </div>
                    <button className='btn' onClick={copyRoomId}>
                        Copy ROOM ID
                    </button>
                    <button className='leaveBtn' onClick={leaveRoom}>
                        Leave
                    </button>
                </div>
                <div className='editorWrap'>
                    
                </div>
            </div>
        </div>
  )
}

export default Room
