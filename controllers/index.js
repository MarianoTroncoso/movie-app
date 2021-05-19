const { getLogin } = require('./auth/login');
const { postSignup } = require('./auth/signup');
const { getMovies, getOneMovie } = require('./moviesController');

module.exports = {
  getLogin,
  getMovies,
  getOneMovie,
  postSignup
}