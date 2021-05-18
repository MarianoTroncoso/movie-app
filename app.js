const express = require('express');
const { logger } = require('./configuration') 

const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();

process.on('unhandledRejection', (reason) => {
  logger.error(reason);
  process.exit(1);
})

// middlewares
middlewares(app);

// routes 
routes(app);

module.exports = app;
