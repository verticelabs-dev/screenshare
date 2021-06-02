import config from "../../config";
import { authService } from "../services/auth";
import { Request, Response } from "express";

export class auth {
  static expressHook(req: Request, res: Response, next) {
    let token = req.cookies[config.auth.cookie];

    if (req.url === '/login') {
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
