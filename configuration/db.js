const { MongoClient } = require('mongodb');
require('dotenv').config();

const _uri = process.env.MONGO_URI

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
}

// test 
// dbCon('movies', async (db) => {
//   const movie = await db.findOne();
//   console.log(movie)
// })

module.exports = dbCon