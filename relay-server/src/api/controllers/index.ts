import { Router } from 'express';
import { auth } from '@api/middleware'

import sample from './sample';
import authRouter from './auth';
import userRouter from './user';

// guaranteed to get dependencies due to the loader
export default () => {
	const app = Router();

	app.use(auth.expressHook); // Verify user - attach to res.locals

	sample(app);

	authRouter(app);

	userRouter(app)

	return app
}