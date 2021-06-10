// Dependencies
import { Router } from 'express';

// Services
import { userService } from '../services';

const route = Router();

export default (app: Router) => {
  app.use('/user', route);

  route.get('/friends', async (req, res) => {
    const query = req.query;

    try {
      if (!query.userID || typeof query.userID !== 'string') throw new Error('userID in the query is required')

      const userID = parseInt(query.userID)

      const relationships = await userService.getRelationships(userID);

      return res.status(200).send(relationships);
    } catch (error) {
      res.log.error(error);
      return res.status(500).send({ message: error.message });
    }
  });
};
