const argon2 = require('argon2');
const jwt = require('jsonwebtoken');


let encryptPassword = async (password) => {
    try {
        const hash = await argon2.hash(password);
        return hash
      } catch (err) {
        //...
      }
}

let verifyPassword = async (password_hash, plain_password) => {
  try {
    if (await argon2.verify(password_hash, plain_password)) {
      return true
    } else {
      return false
    }
  } catch (err) {
    // internal failure
  }
}

let generateToken = (data) => {
  let token = jwt.sign(data, 'MySecret');
  return token
}

module.exports = {
    encryptPassword,
    verifyPassword,
    generateToken
}