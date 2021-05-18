const { dbCon } = require('../configuration');
const { ObjectId } = require('bson');
const createError = require('http-errors');

const getMovies = (req, res, next) => {

  const pageNum = parseInt(req.params.page);

  // id valido? 
  if(isNaN(pageNum)) return next(createError(400));


  const moviesToSkip = (pageNum - 1) * 10;

  try {
    dbCon('movies', async(db) => {
      // queremos mostrar 10 movies por pagina
      const movies = await db.find({}).skip(moviesToSkip).limit(10).toArray();
      res.json(movies);
    })
  } catch (error) {
    next(createError(500))
  }

};

const getOneMovie = (req, res, next) => {

  // id valido? 
  if(!ObjectId.isValid(req.params.id)) return next(createError(400));

  const _id = new ObjectId(req.params.id);

  try {
    dbCon('movies', async (db) => {
      const movie = await db.findOne({_id});
      if(!movie){
        return next(createError(404));
      }
      res.json(movie);
    })
  } catch (error) {
    return next(createError(500));
  }
}

module.exports = {
  getMovies,
  getOneMovie
}