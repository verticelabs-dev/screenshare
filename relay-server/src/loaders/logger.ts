import express from 'express';
import pino from 'pino';
import pinoConnector from 'pino-http';
import config from '@/config';

export const logger = pino({
  prettyPrint: process.env.NODE_ENV !== 'production',
});

export default ({ app }: { app: express.Application }) => {
  const pinoLogger = pinoConnector({
    logger: logger,
    level: config.logger.level,
    autoLogging: false
  });

  app.use(pinoLogger);
};
