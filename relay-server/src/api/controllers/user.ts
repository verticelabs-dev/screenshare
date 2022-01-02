// Dependencies
import { Router } from 'express';

// Services
import { userService } from '@api/services';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get('/friends', async (req, res) => {
    const user = res.locals.auth.data;

    try {
      if (!user || !user.id) throw new Error('User must be logged in')

      const userID = parseInt(user.id)

      const relationships = await userService.getFriends(userID);

      return res.status(200).send(relationships);
    } catch (error) {
      res.log.error(error);
      return res.status(500).send({ message: error.message });
    }
  });
};
