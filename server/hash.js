const bcrypt = require('bcrypt');

const plainPassword = 'test1234'; // You can change this
bcrypt.hash(plainPassword, 10).then(hash => {
  console.log('Hashed password:', hash);
});

