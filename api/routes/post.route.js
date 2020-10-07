import express from 'express';
import PostController from '../controllers/post.controller';
import AuthMiddleware from '../middlewares/auth.middleware';


const postRoute = express.Router();
const {
    createPost,
    updatePost,
    deleteAPost
} = PostController;
const {
    validateAuthHeader
} = AuthMiddleware;

postRoute.post('/post/:user_id', validateAuthHeader, createPost);
postRoute.put('/post/:user_id/:post_id', validateAuthHeader, updatePost);
postRoute.delete('/post/:user_id/:post_id', validateAuthHeader, deleteAPost);

export default postRoute;
