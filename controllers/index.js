const { postLogin } = require('./auth/login');
const { postSignup } = require('./auth/signup');
const { getMovies, getOneMovie } = require('./moviesController');

module.exports = {
  postLogin,
  getMovies,
  getOneMovie,
  postSignup
}