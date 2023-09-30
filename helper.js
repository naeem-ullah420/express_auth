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
  let token = jwt.sign(data, 'MySecret');
  return token
}


let sendMail = async (data, receiver_email) => {
  try{
    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "7b131462101855",
        pass: "21113a50057445"
      }
    });

    const info = await transport.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
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