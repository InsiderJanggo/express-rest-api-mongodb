const bcrypt = require('bcrypt');

const encrypyNumber = 30;
const encryption  = bcrypt.genSaltSync(encrypyNumber);

module.exports.encrypt = (password) => {
  return bcrypt.hashSync(password, encryption);
}