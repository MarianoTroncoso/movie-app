const authRouter = require('./auth');

module.exports = (app) => {

  app.use('/auth', authRouter);

  app.get('/', (req, res, next) => {
  
    res.send('Welcome to the homepage');
    
  });
  
  app.get('/user/:id/:postId', (req, res, next) => {
    
    console.log(req.get('Host'))
    // console.log(req.query);
    // console.log(req.params);
    res.send('Welcome to the user page');
    
  });
  
}