const { Router } = require('express');
const { getMovies, getOneMovie } = require('../controllers');

const { auth } = require('../middlewares');

const router = Router();

// tenemos muchas movies, no podemos traer todas de una, usamos paginas
router
  .get('/movies/:page', getMovies)
  .get('/movie/:id', auth, getOneMovie)

module.exports = router;