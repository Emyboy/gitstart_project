import db from '../database/models'
import ResponseHandler from '../utils/responseHandler.utils';

/**
 * @description - This handle a comment CRUD
 */
export default class CommentController {

    /**
     * @description - This creates a new comment
     * @param {object} req 
     * @param {object} res 
     */
    static async createComment(req, res) {
        try {
            const { comment, user_id, post_id } = req.body;
            const newComment = await db.Comment.create({
                comment,
                user_id,
                post_id
            });
            ResponseHandler.sendResponse(res, { newComment }, 201);
        } catch (error) {
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }

    };

    /**
     * @description - This gets post's comment
     * @param {object} req 
     * @param {object} res 
     */
    static async getAllPostComment(req, res){
        try {
            const { post_id } = req.params;
            const comments = await db.Comment.findAll({
                where: {
                    post_id
                }
            });
            ResponseHandler.sendResponse(res, { comments }, 200);
        } catch (error) {
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }
    }

    /**
     * @description - This edit a user's comment
     * @param {object} req 
     * @param {object} res 
     */
    static async editComment(req, res) {
        try {
            const { comment_id, user_id, post_id, comment } = req.body;
            let editedComment = await db.Comment.update({
                comment
            }, {
                where: {
                    id: comment_id,
                    user_id: user_id,
                    post_id: post_id
                }
            });

            console.log(editedComment)

            // res.json(editedComment)

            if (editedComment[0] > 0) {
                const updatedComment = await db.Comment.findOne({
                    where: {
                        id: comment_id
                    }
                });
                ResponseHandler.sendResponse(res, { updatedComment }, 200);
            } else {
                ResponseHandler.sendResponse(res, { message: 'bad request' }, 400);
            }

        } catch (error) {
            console.log(error);
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }
    }


    /**
     * @description - This delets a user's comment
     * @param {object} req 
     * @param {object} res 
     */
    static async deleteUserComment(req, res) {
        try {
            const { comment_id, user_id, post_id } = req.body;
        const deletedComment = await db.Comment.destroy({
            where: {
                id: comment_id,
                user_id,
                post_id
            }
        });

        if(deletedComment > 0){
            ResponseHandler.sendResponse(res, { message: 'deleted' }, 200);
        }else {
            ResponseHandler.sendResponse(res, { message: 'not found' }, 404);
        }
        } catch (error) {
            console.log(error);
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }

    }

}

