const { MongoClient } = require('mongodb');

// const _uri = ;

const dbCon = (coll, cb, coll2) => {
  MongoClient.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
  .then( async client => { 
    const db = client.db('sample_mflix').collection(coll);

    let db2;
    if(coll2){
      db2 = client.db('sample_mflix').collection(coll2);
    };

    await cb(db, db2);
    client.close();
  });
}

module.exports = dbCon