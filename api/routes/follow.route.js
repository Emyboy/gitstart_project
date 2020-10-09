import express from 'express';
import FollowController from '../controllers/follow.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const followRoute = express.Router();

const {
    follow,
    unFollow,
    getUsersFollowers
} = FollowController;
const {
    validateAuthHeader
} = AuthMiddleware;

followRoute.post('/follow/:following/:follower/:user_id', validateAuthHeader, follow);
followRoute.put('/unfollow/:following/:follower/:user_id', validateAuthHeader, unFollow);
followRoute.get('/followers/:user_id', getUsersFollowers);

export default followRoute;
