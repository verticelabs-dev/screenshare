import { Knex } from 'knex'
import config from '../config';

export const db: Knex = require('knex')(config.db);

export default async () => {
  await db.raw('select now();');

  return db
};
