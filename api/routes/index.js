import express from 'express';
import authRoute from './auth.route';
import postRoute from './post.route';
const indexRoute = express.Router();

indexRoute.use(authRoute);
indexRoute.use(postRoute);

export default indexRoute;

