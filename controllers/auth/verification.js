const jwt = require('jsonwebtoken');
const { readFileSync } = require('fs');
const createError = require('http-errors');
const { dbCon } = require('../../configuration');
const { decode } = require('querystring');

const secret = readFileSync('./private.key');

const getVerify = (req, res, next) => {

  const token = req.query['token'];

  try {
    const decoded = jwt.verify(token, secret);
    dbCon('users', async (db) => {
      const modifiedDoc = await db.updateOn({ username: decoded['username']}, {'$set': { verified: true}});

      if(modifiedDoc.modifiedCount === 0){
        next(createError(404));
      };

      res.json({
        message: 'Your account has been verified!'
      })

    });

  } catch (error) {
    next(createError(400));
  };
  
};

module.exports = {
  getVerify
}