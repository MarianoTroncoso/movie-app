const { dbCon } = require('../configuration');
const { userValidator } = require('../validator');

class User { 
  constructor(userData){
    this.userData = {...userData};
  };

  save(cb){
    dbCon('users', async (db) => {
      try {
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
            });
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
};

/*
const user = new User({
  username: 'marianot',
  email: 'messi@gmail.com',
  password: 'Mariano-1234',
  first_name: 'Mariano',
  last_name: 'Troncoso'
});

user.checkExistence()
.then( check => {
  console.log(check)
})
.catch( err => console.log(err));
*/

module.exports = User;
