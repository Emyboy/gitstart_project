import db from '../database/models';
import response from '../utils/responseHandler.utils';
import { generateToken, hashPassword } from '../utils/auth.utils';

const { sendResponse } = response;

/**
 * @description - This handles api auth
 */
export default class AuthController {
  /**
     * @description - This
     * @param {object} req
     * @param {object} res
     */
  static async registerUser(req, res) {
    console.log(req.body);
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      gender,
      date_of_birth
    } = req.body;
    try {
      // console.log(db);
      const user = await db.User.findOne({
        where: { email }
      });

      if (user) {
        return sendResponse(res, {
          message: 'Email already exist'
        }, 409);
      } else {
        const newUser = await db.User.create({
          firstName,
          lastName,
          username,
          gender,
          date_of_birth,
          email,
          password: hashPassword(password)
        });
        const token = generateToken(user, email);
        // TODO: Send Welcome email
        sendResponse(res, {
          message: 'Signed Up',
          newUser,
          token
        }, 201);
      }
    } catch (error) {
      sendResponse(res, { message: 'error' }, 400, error);
      // console.log(error);
    }

  }
}
