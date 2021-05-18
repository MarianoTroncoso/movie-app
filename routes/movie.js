const { Router } = require('express');
const { getMovies } = require('../controllers')

const router = Router();

// tenemos muchas movies, no podemos traer todas de una, usamos paginas
router.get('/movies/:page', getMovies);

module.exports = router;