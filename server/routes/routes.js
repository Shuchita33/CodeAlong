import express from 'express';
import { signup,signin} from '../controllers/user.js';
import auth from '../middlewares/auth.js';
const userRouter=express.Router();

userRouter.post('/signin',signin);
userRouter.post('/signup',signup);

export default userRouter;