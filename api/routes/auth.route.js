import express from 'express';
import AuthController from '../controllers/auth.controller';
const { 
    registerUser,
    loginUser,
    getUserById,
    getUserByUsername,
    updateUserAccount
 } = AuthController;
const authRoute = express.Router();

authRoute.post('/auth', registerUser);
authRoute.post('/auth/login', loginUser);
authRoute.get('/auth/:user_id', getUserById);
authRoute.get('/user/:username', getUserByUsername);
authRoute.put('/user/:user_id', updateUserAccount);


export default (authRoute);

