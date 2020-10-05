import express from 'express';
import AuthController from '../controllers/auth.controller';
const { 
    registerUser,
    loginUser
 } = AuthController;
const authRoute = express.Router();

authRoute.post('/auth', registerUser);
authRoute.post('/auth/login', loginUser);

export default (authRoute);

