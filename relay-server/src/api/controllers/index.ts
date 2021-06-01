import { Router } from 'express';

import sample from './sample';
import authRouter from './auth';
import { auth } from '../middleware'

// guaranteed to get dependencies due to the loader
export default () => {
	const app = Router();

	app.use(auth.expressHook); // Verify user - attach to res.locals

	sample(app);

	authRouter(app);

	return app
}