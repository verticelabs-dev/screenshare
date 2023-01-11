import express from 'express';
import config from './config';
import { Server } from 'http'

async function startServer() {

  const expressApp = express();
  const httpServer = new Server(expressApp);

  await require('./loaders').default({ expressApp, httpServer });

  httpServer.listen(config.port, () => {

    console.log(`
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
              Your server is ready on port: ${config.port}!
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    `);
  }).on('error', err => {
    console.error(err)
    process.exit(1);
  });
}

startServer();