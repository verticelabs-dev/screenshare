import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import helmet from 'helmet';

export default ({ app }: { app: express.Application }) => {
  /**
   * Health Check endpoints
   */
  app.get('/status', (req, res) => {
    res.status(200).end();
  });

  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
  app.use(helmet());

  // Useful if you're behind a reverse proxy
  // It shows the real origin IP
  app.enable('trust proxy');

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors({
    credentials: true,
    origin: true,
  }));

  // Middleware that transforms the raw body to req.body into json
  app.use(bodyParser.json());

  // Middleware that transforms the cookies into json
  app.use(cookieParser());

  /// catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err['status'] = 404;
    next(err);
  });

  /// basic global error handler
  app.use((err, req, res, next) => {

    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });

  });

};
