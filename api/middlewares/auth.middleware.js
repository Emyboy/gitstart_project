import db from '../database/models';
import { verifyToken } from "../utils/auth.utils";
import response from '../utils/responseHandler.utils';
const { 
    sendResponse
} = response;


export default class AuthMiddleware {
    /** @description validate if user is signup
     * @static
     * @param  {object} req
     * @param  {object} res
     * @param  {object} next
     * @returns {object} next
     * @memberof protectRoutes
     */
    static async validateAuthHeader(req, res, next) {
        try {
            const { token } = req.headers;

            if (!token) {
                return sendResponse(res, { message: 'unauthorized token' }, 401)
            }
            const payload = verifyToken(token);
            // console.log(payload)
            const user = await db.User.findOne({
                where: {
                    id: payload.id
                }
            });
            // console.log('user', user);
            if (!user) {
                return sendResponse(res, { message: 'unauthorized user' }, 401)
            }
            req.payload = payload;
            req.user = user;
            return next();
        } catch (err) {
            // console.log(err);
            if (err.name === 'JsonWebTokenError') {
                return sendResponse(res, { message: 'unauthorized header' }, 401)
            }
            sendResponse(res, { message: 'error' }, 500)
        }
    }
}