import express from 'express';
import pino from 'pino';
import pinoConnector from 'pino-http';

export const logger = pino({
  prettyPrint: process.env.NODE_ENV !== 'production',
});

export default ({ app }: { app: express.Application }) => {
  const pinoLogger = pinoConnector({
    logger: logger,

    autoLogging: false
  });

  app.use(pinoLogger);
};
