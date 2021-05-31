import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your port
   */
  port: parseInt(process.env.PORT, 10) || 8989,

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL,
  },

  /**
   * API configs
   */
  api: {
    prefix: '/',
    jwtSecret: String(process.env.JWT_SECRET)
  },

  db: {
    client: "postgresql",
    connection: {
      host: String(process.env.DB_HOST),
      port: 5438,
      database: String(process.env.DB_DATABASE),
      user: String(process.env.DB_USERNAME),
      password: String(process.env.DB_PASSWORD),
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  }
};
