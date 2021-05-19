const { dbCon } = require('../configuration');

class User { 
  constructor(userData){
    this.userData = {...userData};
  };

  save(){
    dbCon('users', async (db) => {
      await db.insertOne(this.userData);
    });
  };
};

const user = new User({
  username: 'marianotroncoso',
  email: 'petotronco@gmail.com',
  password: 'mariano123',
  first_name: 'Mariano',
  last_name: 'Troncoso'
});

user.save();