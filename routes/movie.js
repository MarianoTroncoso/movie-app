const { Router } = require('express');
const { getMovies, getOneMovie } = require('../controllers')

const router = Router();

// tenemos muchas movies, no podemos traer todas de una, usamos paginas
router
  .get('/movies/:page', getMovies)
  .get('/movie/:id', getOneMovie)

module.exports = router;