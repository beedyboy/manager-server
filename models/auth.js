const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');
const {validate, checkHeader, sellerAuth} = require('../middleware/valid'); 
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const mailer = require("../plugins/mailer");
// const router = require('express').Router;

const router = express.Router();

//check if 
router.get("/:email/exist", (req, res) => { 
   try {
	 const email = req.params.email;  
	 db('staffs').where({email}).select('email').then( ( data ) => {  
	 if(data.length > 0) {
	  res.send({exist: true});
	} else {
	   res.send({exist: false});
	 } 
	
	}); 
  } catch (err) {
	console.log(err);
  }

});
 
 
 
router.post("/auth", (req, res) => {
try {
	const { email } = req.body; 
	db('logins').where({email}).select().then( (user) => {
		if(user.length > 0) {
		const data = user[0];
		if (bcrypt.compareSync(req.body.password, data.password)) {
			  const token = helper.generateToken(data);   
			  helper.setSignature( data.id, token).then(rep => {
				user.token = token;
			  if( rep === true ) {
				db('staffs').where('id', data.id)
				.select('staffs.firstname', 'staffs.lastname', 'staffs.acl')
				.then(payload => { 
					const staff =  payload[0]; 
				 res.json({
					status: 200, 
					user,
					token, 
					staff,
					msg: "Login successful", 
				  })
				}) 
			  } 
			}) 
		} else {
			 res.send({
		  status: 400,
		  msg: "wrong email or password"
		});
		}
		}
	})
} catch (error) {
	console.log(error);
	res.status(500).json({msg: "Something went wrong!!!"})
}
   
});


module.exports = router;

  