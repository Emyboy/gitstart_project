import express from 'express';
import authRoute from './auth.route';
import followRoute from './follow.route';
import postRoute from './post.route';
const indexRoute = express.Router();

indexRoute.use(authRoute);
indexRoute.use(postRoute);
indexRoute.use(followRoute);

export default indexRoute;

