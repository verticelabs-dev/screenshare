import { Router } from 'express';

import sample from './sample';

// guaranteed to get dependencies due to the loader
export default () => {
  const app = Router();

	sample(app);

	return app
}