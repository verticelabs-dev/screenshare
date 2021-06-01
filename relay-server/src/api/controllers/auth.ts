// Dependencies
import { Router, Request, Response } from 'express';
import config from 'src/config';
const route = Router();

// Services
import { authService } from '../services';

export default (app: Router) => {
  app.use('/', route);

  route.post('/login', async (req: Request, res: Response) => {
    const body = req.body;

    try {
      if (!body.email || typeof body.email !== 'string') throw new Error('Email required')
      if (!body.password || typeof body.password !== 'string') throw new Error('Password required')

      const user = await authService.login(body.email, body.password)

      const userJWT = authService.generateJwt(user)
      // TODO - insert the session in redis so that we have tracking on JWT's created by us

      // (12*60*60) = 43200 - 12 hours (NOTE: JWT's are set to expire in 12 hours)
      res.cookie(config.auth.cookie, userJWT, { maxAge: 43200 });

      return res.status(200).send(user);
    } catch (error) {
      return res.status(403).send({ message: error.message });
    }
  });

  route.get('/logout', async (req: Request, res: Response) => {
    // TODO - kill the session in redis so that way it is actually dead

    res.cookie(config.auth.cookie, '', { maxAge: -1 });

    return res.status(200).send();
  });
};
