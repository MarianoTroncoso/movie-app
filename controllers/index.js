const { postLogin } = require('./auth/login');
const { postSignup } = require('./auth/signup');
const { getVerify } = require('./auth/verification');
const { getMovies, getOneMovie } = require('./moviesController');

module.exports = {
  postLogin,
  getMovies,
  getOneMovie,
  postSignup,
  getVerify
}