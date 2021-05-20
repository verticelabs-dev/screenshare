import { Logger } from 'pino';

declare global {
  namespace Express {
    export interface Request {
      log: Logger
    }
    export interface Response {
      log: Logger
    }
  }
}
