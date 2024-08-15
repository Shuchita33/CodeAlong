import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/routes.js';
import router from './routes/room.js';
import http from 'http';
import { Server } from 'socket.io';
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 5000;
io.on('connection', () => {
  console.log("Socket connected ");
});
app.use(cors());
app.use(express.json());

app.use('/user',userRouter);
app.use('/',router);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
