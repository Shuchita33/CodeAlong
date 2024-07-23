import express from 'express';
import { signup,signin} from '../controllers/user.js';
import {getUserWorkspaces} from '../controllers/userWorkspaces.js';

const userRouter=express.Router();

userRouter.post('/signin',signin);
userRouter.post('/signup',signup);

userRouter.get('/:id/workspaces', getUserWorkspaces);

export default userRouter;