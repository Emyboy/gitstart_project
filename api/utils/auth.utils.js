import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

/**
 * @description - This returns a hashed version of a password text
 * @param {string} password plane text password
 */
export const hashPassword = password => {
    const hash = bcrypt.hashSync(password.trim(), 10);
    return hash
}

/**
 * @description - This returns token string
 * @param {number} userId - user id
 * @param {string} email - user email
 */
export const generateToken = (userId, email ) => {
    const token = jwt.sign({
        id: userId,
        email
    }, process.env.PASSWORD, { expiresIn: '1d' });
    return token;
};

/**
 * @description - Compare plane text password with hash
 * @param {string} password 
 * @param {string} userPassword 
 */
export const comparePassword = (password, userPassword) => {
    return bcrypt.compareSync(password, userPassword);
}

