const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')


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
    console.log("error", err)
  }
}

let generateToken = (data) => {
  let token = jwt.sign(data, process.env.JWT_SECRET);
  return token
}


let sendMail = async (data, receiver_email) => {
  try{
    let transport = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
      }
    });

    const info = await transport.sendMail({
      from: process.env.MAIL_FROM, // sender address
      to: receiver_email, // list of receivers
      subject: "ForgotPassword", // Subject line
      text: "Forgot Password", // plain text body
      html: data, // html body
    });

    console.log("Message sent: %s", info.messageId);
  } catch(err) {
    console.log("error: ", err)
  }

}

module.exports = {
    encryptPassword,
    verifyPassword,
    generateToken,
    sendMail
}