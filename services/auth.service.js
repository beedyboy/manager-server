const sendEmail = require("../utils/email/sendEmail");
const db = require("../config/knex");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const JWTSecret = process.env.SECRET_KEY;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

const requestPasswordReset = async (email) => {
  let payload = {};
  const user = await db("staffs").where({ email }).first(); 
  if (!user) {
    payload.message = "Email does not exist";
    payload.status = 400;
  return payload;
  }

  let token = await db("tokens").where("staff_id", user.id).first(); 
  if (token) await db("tokens").where("staff_id", user.id).del();

  let resetToken = crypto.randomBytes(32).toString("hex");
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(resetToken, salt);
  const data = {
    staff_id: user.id,
    token: hash,
    created_at: Date.now(),
  };
  await db("tokens").insert(data);

  const link = `${clientURL}/password-reset?token=${resetToken}&id=${user.id}`;

  sendEmail(
    user.email,
    "Password Reset Request",
    {
      name: user.firstname + " " + user.lastname,
      link: link,
    },
    "./template/requestPasswordReset.handlebars"
  );
  payload.message = "We have sent a password recover instructions to your email.";
  payload.link = link;
  payload.status = 200;
  return payload;
};

const resetPassword = async (staff_id, token, password) => { 
  let payload = {};
  let passwordResetToken = await db("tokens").where({staff_id}).first(); 
 
  if (!passwordResetToken) {
    payload.message = "Invalid or expired password reset token";
    payload.status = 400;
  return payload;
  }  
  const isValid = await bcrypt.compareSync(token, passwordResetToken.token);

  if (!isValid) {
    payload.message = "Invalid or expired password reset token";
    payload.status = 400;
  return payload; 
  }

  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);
  const data = {
    staff_id,
    token: hash,
    updated_at: Date.now(),
  };

  await  db("logins").where("id", id).update(data)
 

  const user = await db("staffs").where({staff_id}).first()

  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.firstname + " " + user.lastname,
    },
    "./template/resetPassword.handlebars"
  );


  if (token) await db("tokens").where("staff_id", user.id).del();

  payload.message = "Password changed successfully"; 
  payload.status = 200;
  return payload;
};

module.exports = {
  requestPasswordReset,
    resetPassword,
};
