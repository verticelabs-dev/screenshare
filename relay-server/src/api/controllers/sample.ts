// Dependencies
import { Router, Request, Response } from 'express';
const route = Router();

// Services
import { sampleService } from '../services';
const SampleService = new sampleService()

export default (app: Router) => {
  app.use('/', route);

  route.get('/ping', async (req: Request, res: Response) => {
    req.log.info('test');

    const data = await SampleService.ping()

    return res.status(200).send(data);
  });
};
