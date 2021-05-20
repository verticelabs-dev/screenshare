import { logger } from '@loaders/logger'
import { sample } from '../models/index'

export class sampleService {

  public async ping () {
    // logger.info('We made it to the service')
    return await sample.getSampleTableList()
  }
}