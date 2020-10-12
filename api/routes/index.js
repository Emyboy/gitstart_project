import express from 'express';
import authRoute from './auth.route';
import commentRoute from './comment.route';
import followRoute from './follow.route';
import postRoute from './post.route';
const indexRoute = express.Router();

indexRoute.use(authRoute);
indexRoute.use(postRoute);
indexRoute.use(followRoute);
indexRoute.use(commentRoute);

export default indexRoute;

