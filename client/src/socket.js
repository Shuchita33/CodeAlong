import { io } from 'socket.io-client';

const initSocket = async () => {
    const options = {
        forceNew: true,
        reconnectionAttempts: Infinity,
        timeout: 10000,
        transports: ['websocket'],
    };
    
    return io('http://localhost:5000', options);
};

export default initSocket;
