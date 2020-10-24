import db from '../database/models';
import response from '../utils/responseHandler.utils';
import { generateToken, hashPassword, comparePassword } from '../utils/auth.utils';

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
    const {
      username,
      firstName,
      lastName,
      email,
      password,
      gender,
      // date_of_birth
    } = req.body;
    console.log(req.body);
    try {
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
          // date_of_birth,
          email,
          password: hashPassword(password)
        });
        const token = generateToken(newUser.id, email);
        // TODO: Send Welcome email
        sendResponse(res, {
          message: 'Signed Up',
          newUser,
          token
        }, 201);
      }
    } catch (error) {
      console.log(error);
      sendResponse(res, { message: 'error' }, 400, { error });
    }
  }

  /**
   * @description - This login a user in each time
   * @param {object} req 
   * @param {object} res 
   */
  static async loginUser(req, res) {
    try {
      const {
        email,
        password
      } = req.body;
      const user = await db.User.findOne({
        where: { email }
      });
      console.log('logging in ----', req.body);
      console.log('found user', user);
      if (user) {
        const ownsPassword = comparePassword(req.body.password, user.password);
        console.log('owns password --', ownsPassword);
        if (ownsPassword) {
          sendResponse(res, {
            user,
            token: generateToken(user.id, email)
          }, 200);
          console.log('got -- user');
        }
      } else {
        sendResponse(res, { message: 'not found' }, 404);
        console.log('no user --');
      }
    } catch (error) {
      console.log('error ---', error);
      sendResponse(res, {}, 500, { message: 'error' });
    }

  }

  /**
   * @description - This gets a user by id
   * @param {object} req 
   * @param {object} res 
   */
  static async getUserById(req, res) {
    try {
      const { user_id } = req.params;
      const user = await db.User.findOne({
        where: { id: user_id }
      });

      if (user) {
        delete user.password;
        sendResponse(res, { user }, 200);
      } else {
        sendResponse(res, { message: 'not found' }, 404);
      }
    } catch (error) {
      sendResponse(res, error, 500, { message: 'error' });
    }
  };

  /**
   * @description - This gets user by username
   * @param {object} req 
   * @param {object} res 
   */
  static async getUserByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await db.User.findOne({
        where: { username }
      });

      if (user) {
        delete user.password;
        sendResponse(res, { user }, 200);
      } else {
        sendResponse(res, { message: 'not found' }, 404);
      }
    } catch (error) {
      sendResponse(res, error, 500, { message: 'error' });
    }
  };


  /**
   * @description - This update a user's account
   * @param {object} req 
   * @param {object} res 
   */
  static async updateUserAccount(req, res) {
    const { user_id } = req.params;
    const {
      username,
      firstName,
      lastName,
      gender,
      date_of_birth,
      about,
      banner_url,
      avatar_url
    } = req.body;

    const updatedAccount = await db.User.update({
      username,
      firstName,
      lastName,
      gender,
      date_of_birth,
      about,
      banner_url,
      avatar_url
    }, {
      where: {
        id: user_id
      }
    });
    if (updatedAccount[0] === 1) {
      const user = await db.User.findOne({
        where: {
          id: user_id
        }
      });
      sendResponse(res, { user }, 200);
    } else {
      sendResponse(res, { message: 'bad request' }, 400);
    }
  }

}
