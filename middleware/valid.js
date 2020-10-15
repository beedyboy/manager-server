
const db = require('../config/knex');  

  function validate(tbl) {
  return async function (req,res, next) { 
    let email = req.body.email; 
    let user = await db(tbl).where('email', email);
    console.log(user, user);
        if (user.length > 0) {
            res.json({
              status: 400,
              success: false,
              msg: "Email already exist"
          });
        } else {
           next();
        }
       
  }
}
 function validateName(tbl) {
  return async function (req,res, next) { 
    let name = req.body.name; 
    let user = await db(tbl).where('name', name);
    console.log(user, user);
        if (user.length > 0) {
            res.json({
              status: 400,
              success: false,
              msg: "Name already exist"
          });
        } else {
           next();
        }
       
  }
}

 function checkHeader(req, res, next) {
  try { 
    if(req.headers.authorization.split(' ')[0] === 'Bearer') {
      const token = req.headers.authorization.split(' ')[1];  
      db('logins').where({token})
      .join('staffs as s', 'logins.staff_id', '=', 's.id')
      .select('logins.token', 'logins.staff_id', 'logins.id as login_id', 's.*').then((data) => { 
        if (data.length > 0) {
          req.token = token;
          req.user = data[0]; 
          next();
        } else { 
          res.json({
            status: 500,
            success: false,
            message: "Invalid token! Please login again" + token
        });
        }
      }).catch(err => console.log('token', err))
    }
} catch (err) {
  console.log('error', err);
}
 }  

async function verify(req,res, next) {
  let email = req.body.email; 
  let phone= req.body.phone;
  let code = req.body.code;
  let user = await db('activations').where({'email': email, 'phone': phone});  
  let rcode = user[0].code; 
  rcode = rcode.replace(/ +/g, ""); 
  if (user.length > 0 && rcode === code) {
    db('activations').where({ id: user[0].id }).del().then( d => {
      next();
    });   

  } else {
      return res.json({
      status: 400, 
      msg: "Wrong validation code"
    });

  }


}

module.exports = { validate, validateName, checkHeader, verify}