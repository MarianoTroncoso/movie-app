require('dotenv').config();

const express = require('express');
const { logger } = require('./configuration');
const createError = require('http-errors');

const {middleware} = require('./middlewares');
const routes = require('./routes');

const app = express();

// en error graves, el servidor se detiene, "no database, no app"
process.on('unhandledRejection', (reason) => {
  logger.error(reason);
  process.exit(1);
});

// middlewares
middleware(app);

// routes 
routes(app);

// ultima opcion:
app.use((req, res, next) => {
  const error = createError(404);
  next(error);
  // res.status(error.statusCode).send(error.message); <-- no lo usamos mas, sino que uso lo de abajo
});

app.use((error, req, res, next) => {
  logger.error(error.message);

  // res.statusCode = error.statusCode;

  res.status(error.statusCode).json({
    message: error.message
  })
})

module.exports = app;
