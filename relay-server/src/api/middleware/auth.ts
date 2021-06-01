import config from "../../config";
import { authService } from "../services/auth";
import { Request, Response } from "express";

export class auth {
  static expressHook(req: Request, res: Response, next) {
    let token = req.cookies[config.auth.cookie];

    if (req.url === '/login') {
      return next();
    }

    if (!token) {
      // If they don't have a token assume they are a guest
      token = authService.generateJwt({});
      res.cookie(config.auth.cookie, token, { maxAge: 900000 });
      res.locals.auth = {};
      return next();
    }

    const auth = authService.verifyJwt(token);
    res.locals.auth = auth;

    if (!auth) {
      // If they have a token but it has been altered decline them
      return res.send("Not Today");
    }

    next();
  }
}
