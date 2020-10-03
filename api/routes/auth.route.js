import express from 'express';
import AuthController from '../controllers/auth.controller';
const { registerUser } = AuthController;
const authRoute = express.Router();

authRoute.get('/auth', registerUser);

export default (authRoute);

