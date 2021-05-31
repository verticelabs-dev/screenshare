import config from '../../config';
import { authHelper } from '../services/auth';
import { Request, Response } from 'express';

export class auth {
  static expressHook(req: Request, res: Response, next) {
    var token = req.cookies[config.auth.cookie];

    if (!token) {
      return res.send('NOT LOGGED IN')
    }

    const auth = authHelper.verifyJwt(token);

    if (!auth) {
      return res.send('NOT LOGGED IN')
    }

    res.locals.auth = auth;

    next()
  }

  static logout() {

  }

  static login() {
    // res.cookie(config.auth.cookie, 'BIG OL TEST', { maxAge: 900000, httpOnly: true });
  }
}

