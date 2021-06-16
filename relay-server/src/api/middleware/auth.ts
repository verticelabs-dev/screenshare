import config from "../../config";
import { authService } from "../services/auth";
import { Request, Response } from "express";
import { ExtSocket } from "src/models/socket";

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
      return res.status(403).send("Not Today");
    }

    next();
  }

  static socketHook(socket: ExtSocket) {
    socket.prependAny((event, ...args) => {
      const isValid: any = authService.verifyJwt(args[0].sessionToken);

      args[0].sessionToken = undefined;

      if (isValid) {
        socket.auth = isValid.data;
      }
    });
  }
}
