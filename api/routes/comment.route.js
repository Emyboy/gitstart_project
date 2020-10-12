import express from 'express';
import CommentController from '../controllers/comment.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const commentRoute = express.Router();
const {
    createComment,
    editComment
} = CommentController;
const {
    validateAuthHeader
} = AuthMiddleware;

commentRoute.post('/comment', validateAuthHeader, createComment);
commentRoute.put('/comment/update', validateAuthHeader, editComment);


export default commentRoute;
