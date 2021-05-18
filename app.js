const express = require('express');
const { logger } = require('./configuration');
const createError = require('http-errors');
require('dotenv').config()

const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

// en error graves, el servidor se detiene, "no database, no app"
process.on('unhandledRejection', (reason) => {
  logger.error(reason);
  process.exit(1);
});

// middlewares
middlewares(app);

// routes 
routes(app);

// ultima opcion:
app.use((req, res, next) => {
  const error = createError(404);
  res.status(error.statusCode).send(error.message);
});

module.exports = app;
