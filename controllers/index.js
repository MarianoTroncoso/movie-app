const { getLogin } = require('./auth/login');
const { getMovies, getOneMovie } = require('./moviesController');

module.exports = {
  getLogin,
  getMovies,
  getOneMovie
}