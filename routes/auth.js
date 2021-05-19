const { Router } = require('express');
const { postLogin, postSignup } = require('../controllers');

const router = Router();

router 
  // .get('/login', getLogin)
  .post('/login', postLogin)
  // .get('/signup')
  .post('/signup', postSignup)

module.exports = router;