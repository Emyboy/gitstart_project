import db from '../database/models';

/**
 * @description - This handles api auth
 */
export default class AuthController {
  /**
     * @description - This
     * @param {object} req
     * @param {object} res
     */
  static registerUser(req, res) {
    res.send('working from AUTH');
  }
}
