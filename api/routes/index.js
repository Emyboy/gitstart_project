import express from 'express';
import authRoute from './auth.route';
const indexRoute = express.Router();

indexRoute.use(authRoute);

export default indexRoute;

