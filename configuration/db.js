const { MongoClient } = require('mongodb');

const _uri = 'mongodb+srv://admin:benji123@movieapp.shikt.mongodb.net/sample_mflix?retryWrites=true&w=majority'

const dbCon = (coll, cb) => {
  MongoClient.connect(_uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then( async client => { 
    const db = client.db('sample_mflix').collection(coll);
    await cb(db);
    client.close();
  })
  .catch()
}

// test 
// dbCon('movies', async (db) => {
//   const movie = await db.findOne();
//   console.log(movie)
// })

module.exports = dbCon