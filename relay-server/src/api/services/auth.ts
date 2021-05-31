import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

export class authHelper {
  static hashPassword(pwd) {
    return argon2.hash(pwd, { type: argon2.argon2i });
  }

  static verifyPassword(hashedPwd, pwd) {
    // if (process.env.NODE_ENV === 'development') return true;
    return argon2.verify(hashedPwd, pwd, { type: argon2.argon2i });
  }

  static generateJwt(user) {
    let t = jwt.sign({ data: user }, process.env.JWT_SECRET, { expiresIn: '12h' });
    return t;
  }

  static verifyJwt(token) {
    try {
      // let checkSession = true; // TODO ADD REDIS SESSION CONTROL (CHECK FOR TOKEN IN REDIS THEN VERIFY THAT IT WAS ONE GENERATED BY US)
      return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
      return false;
    }
  }

  static logout() {

  }

  static login() {
    // res.cookie(config.auth.cookie, 'BIG OL TEST', { maxAge: 900000, httpOnly: true });
  }
}

