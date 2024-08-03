import express from 'express';
import { signup,signin} from '../controllers/user.js';
import {getUserWorkspaces,addUserWorkspace,deleteWorkspace,updateWorkspaceName,addCardToWorkspace,updateCardName} from '../controllers/userWorkspaces.js';

const userRouter=express.Router();

userRouter.post('/signin',signin);
userRouter.post('/signup',signup);

userRouter.get('/:id/workspaces', getUserWorkspaces);
userRouter.post('/:id/workspaces', addUserWorkspace);
userRouter.delete('/:id/workspaces/:wsId', deleteWorkspace);
userRouter.patch('/:id/workspaces/:wsId', updateWorkspaceName)
userRouter.patch('/:id/workspaces/:wsId/addCard', addCardToWorkspace);
userRouter.patch('/:id/workspaces/:wsId/cards/:cardId', updateCardName);
export default userRouter;