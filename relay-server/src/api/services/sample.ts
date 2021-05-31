import { logger } from '@loaders/logger'
import { db } from '@loaders/database'
// import { sample } from '../models/index'


export class sampleService {
  public async ping() {
    logger.info('We made it to the service')
    return await db('users').select()
  }
}