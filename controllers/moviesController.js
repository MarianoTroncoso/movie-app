const { dbCon } = require('../configuration');
const { ObjectId } = require('bson')

const getMovies = (req, res, next) => {

  const pageNum = parseInt(req.params.page);

  // id valido? 
  if(isNaN(pageNum)) return res.status(400).send('Bad request');

  const moviesToSkip = (pageNum - 1) * 10;

  try {
    dbCon('movies', async(db) => {
      // queremos mostrar 10 movies por pagina
      const movies = await db.find({}).skip(moviesToSkip).limit(10).toArray();
      res.json(movies);
    })
  } catch (error) {
    return res.status(500).send('Internal Server Error');
  }

};

const getOneMovie = (req, res, next) => {

  // id valido? 
  if(!ObjectId.isValid(req.params.id)) return res.status(400).send('Bad Request')

  const _id = new ObjectId(req.params.id);

  try {
    dbCon('movies', async (db) => {
      const movie = await db.findOne({_id});
      if(!movie){
        res.status(404).send('Not Found');
      }
      res.json(movie)
    })
  } catch (error) {
    return res.status(500).send('Internal Server Error')
  }
}

module.exports = {
  getMovies,
  getOneMovie
}