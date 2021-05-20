const { MongoClient } = require('mongodb');

// const _uri = ;

const dbCon = (coll, cb) => {
  MongoClient.connect(process.env.MONGO_URI, { 
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