import express from 'express';
import { signup,signin} from '../controllers/user.js';
import auth from '../middlewares/auth.js';
const userRouter=express.Router();

userRouter.post('/signin',auth,signin);
userRouter.post('/signup',auth,signup);

export default userRouter;