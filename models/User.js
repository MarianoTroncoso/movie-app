const { dbCon } = require('../configuration');
const { userValidator, logSchema } = require('../validator');
const { hashSync, compareSync } = require('bcryptjs')

class User { 
  constructor(userData){
    this.userData = {...userData};
  };

  // instert
  save(cb){
    dbCon('users', async (db) => {
      try {

        // hash the password
        const hashedPass = hashSync(this.userData['password'], 12); // 12 iteraciones
        
        this.userData['password'] = hashedPass;

        this.userData['verify'] = false; // para controlar en "Verify account" al enviar el email
        
        await db.insertOne(this.userData);
        cb()
      } catch (error) {
        cb(error);
      };
    });
  };

  // el usuario que se quiere guardar ya existe?
  checkExistence(){
    return new Promise( (resolve, reject) => {
      dbCon('users', async (db) => {

        try {
          
          // por username o email
          const user = await db.findOne({'$or': [{username: this.userData['username']}, {email: this.userData['email']}]});

          if(!user){
            // no existe el usuario, guardo
            resolve({
              check: false
            })
          } else if(this.userData['username'] === user.username){
            // existe el username
            resolve({
              check: true,
              message: 'this username is already in use'
            })
          } else if(this.userData['email'] === user.email){
            // existe el email
            resolve({
              check: true,
              message: 'this email es already in use'
            });
          };

        } catch (error) {
            reject(error);
        }
      });
    });
  };

  // validar la informacion antes de desperdiciar tiempo creando una nueva instancia
  static validate(userData){
    return userValidator.validate(userData);
  }

  static login(userData){
    return new Promise( (resolve, reject) => {

      // validation
      const validation = logSchema.validate(userData);
      if(validation.error){
        const error = new Error(validation.error.message);
        error.statusCode = 400;
        return resolver(error);
      };

      
      dbCon('users', async (db) => {
        try {

          // find user
          const user = await db.findOne(
            {'$or': 
            [
              {username: userData['username']},
              {email: userData['email']}
            ]}, 
            // select 
            {projection: 
              {
                username: 1,
                password: 1,
                // _id es retornado por defecto siempre
              }
            }
          );

          // not valid user? + incorrect password? 
          if(!user || !compareSync(userData['password'], user.password)){
            const error = new Error('Please enter valid username and password');
            error.statusCode = 404;
            return resolve(error);
          };

          resolve(user);

        } catch (error) {
          reject(error);
        }
      });
    });
  };
};

module.exports = User;
