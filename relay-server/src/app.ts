import 'reflect-metadata'; // We need this in order to use @Decorators
import express from 'express';
import config from './config';

async function startServer() {

  const app = express();

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, () => {

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