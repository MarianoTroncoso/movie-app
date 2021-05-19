const { dbCon } = require('../configuration');
const { userValidator } = require('../validator');

class User { 
  constructor(userData){
    this.userData = {...userData};
  };

  save(){
    dbCon('users', async (db) => {
      await db.insertOne(this.userData);
    });
  };

  // validar la informacion antes de desperdiciar tiempo creando una nueva instancia
  static validate(userData){
    // de la validación
    return userValidator.validate(userData);
    // console.log(result.error.message);
  }
};

const userData = {
  username: 'marianot',
  email: 'petotronco@gmail.com',
  password: 'Mariano-1234',
  first_name: 'Mariano',
  last_name: 'Troncoso'
};

// si solo devuelve value, todo bien
const validation = User.validate(userData);
console.log(validation)