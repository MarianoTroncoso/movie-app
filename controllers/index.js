const { getLogin } = require('./auth/login');
const { getMovies } = require('./moviesController');

module.exports = {
  getLogin,
  getMovies
}