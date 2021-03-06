import db from '../database/models';
import ResponseHandler from '../utils/responseHandler.utils';
const { Op } = require('sequelize');

/**
 * @description - This class handles post requests
 */
export default class PostController {
    
    /**
     * @description - This handles create post request
     * @param {object} req 
     * @param {object} res 
     */
    static async createPost(req, res) {
        console.log('adding ---', res.body);
        try {
            const { user_id } = req.params;
            const {
                caption,
                image
            } = req.body;
            if(caption){

                const newPost = await db.Post.create({
                    caption,
                    image,
                    user_id
                });
                if (newPost) {
                    ResponseHandler.sendResponse(res, { newPost }, 201);
                } else {
                    ResponseHandler.sendResponse(res, { message: 'bad request' }, 400);
                }
            }else {
                ResponseHandler.sendResponse(res, { message: 'bad reqest' }, 400);
            }
        } catch (error) {
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }
    };

    /**
     * @description - This updates user's post
     * @param {object} req 
     * @param {object} res 
     */
    static async updatePost(req, res) {
        try {
            const { user_id, post_id } = req.params;
            const { caption, image } = req.body;
            const post = await db.Post.update({
                caption, image
            }, {
                where: {
                    id: post_id,
                    user_id
                }
            });
            const updatedPost = await db.Post.findOne({
                where: {
                    id: post_id
                }
            });
            if (post[0] === 1){
                ResponseHandler.sendResponse(res, { updatedPost }, 200);
            }else {
                ResponseHandler.sendResponse(res, { message: 'bad request' }, 400);
            }
        } catch (error) {
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }
    };

    /**
     * @description - This deletes a user's post
     * @param {object} req 
     * @param {object} res 
     */
    static async deleteAPost(req, res){
        try {
            const { user_id, post_id } = req.params;
            const deletedPost = await db.Post.destroy({
                where: {
                    id: post_id,
                    user_id
                }
            });
            if (deletedPost > 0) {
                ResponseHandler.sendResponse(res, { message: 'deleted' }, 202);
            } else {
                ResponseHandler.sendResponse(res, { message: 'bad request' }, 400);
            }
        } catch (error) {
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }
    }

    /**
     * @description - This handles blog search
     * @param {object} req 
     * @param {object} res 
     */
    static async searchPost(req, res){
        const { key_word } = req.params;
        const wordList = key_word.split(" ");

        console.log('searching for ---', wordList);
        try {
            const posts = await db.Post.findAll({
                where: {
                    caption: {
                        [Op.like]: `%${key_word}%`
                        // [Op.like]: { [Op.any]: wordList}
                    }
                }
            })
            res.json(posts);
        } catch (error) {
            res.json(error);
        }
    }

    // TODO - get and sort following posts max of
    


}

