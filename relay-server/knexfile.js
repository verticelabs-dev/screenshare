require("dotenv").config();

module.exports = {
  client: "postgresql",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: 5438,
    database: "screen_share",
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
};
