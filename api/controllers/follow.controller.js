import db from '../database/models';
import ResponseHandler from '../utils/responseHandler.utils';

/**
 * @description - This handles follow and unfollow of a user
 */
export default class FollowController {

    /**
     * @description - This follows a user
     * @param {object} req 
     * @param {object} res 
     */
    static async follow(req, res) {
        try {
            const { following, follower, user_id } = req.params;
            const isFollowing = await db.Follow.findOne({
                where: {
                    following,
                    follower,
                    user_id
                }
            });
            if (isFollowing) {
                ResponseHandler.sendResponse(res, { followed: isFollowing }, 201);
            } else {
                const followed = await db.Follow.create({
                    following,
                    follower,
                    user_id
                });
                if (followed) {
                    // TODO - Send notification
                    ResponseHandler.sendResponse(res, { followed }, 201);
                } else {
                    ResponseHandler.sendResponse(res, { message: 'bad request' }, 400);
                }
            }
        } catch (error) {
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }
    };

    /**
     * @description - This unfollows a user
     * @param {object} req 
     * @param {object} res 
     */
    static async unFollow(req, res){
        try {
            const { following, follower, user_id } = req.params;
            const unFollowed = await db.Follow.destroy({
                where: {
                    following,
                    follower,
                    user_id
                }
            });

            console.log('UNFOLLOW ----', unFollowed)

            if(unFollowed > 0){
                ResponseHandler.sendResponse(res, { message: 'unfollowed' }, 200);
            }else {
                ResponseHandler.sendResponse(res, { message: 'bad request' }, 400);
            }
        } catch (error) {
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }
    };


    /**
     * @description - This get a user's followers
     * @param {object} req 
     * @param {object} res 
     */
    static async getUsersFollowers(req, res){
        try {
            const { user_id } = req.params;
            const followers = await db.Follow.findAll({
                where: { following: user_id }
            });

            if (followers) {
                ResponseHandler.sendResponse(res, { followers, count: followers.length }, 200);
            } else {
                ResponseHandler.sendResponse(res, { message: 'bad request' }, 400);
            }
        } catch (error) {
            ResponseHandler.sendResponse(res, { message: 'error' }, 500);
        }
    }

}

