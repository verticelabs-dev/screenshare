import express from 'express';
import pino from 'pino';
import pinoConnector from 'pino-http';
import config from '../config';

// const loggerOptions = process.env.NODE_ENV === 'production'? {} : {
//   transport: {
//     target: 'pino-pretty',
//     options: {
//       colorize: true
//     }
//   }
// }

export const logger = pino();

export default ({ app }: { app: express.Application }) => {
  const pinoLogger = pinoConnector({
    logger: logger,
    level: config.logger.level,
    autoLogging: false
  });

  app.use(pinoLogger);
};
