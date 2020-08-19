const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');
const {validate, checkHeader, sellerAuth} = require('../middleware/valid'); 
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const mailer = require("../plugins/mailer");
// const router = require('express').Router;

const router = express.Router();

 
 
 
 
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
				db('staffs').where('id', data.staff_id)
				.select('staffs.firstname', 'staffs.lastname', 'staffs.acl')
				.then( (staff) => { 
					// const staff =  payload[0]; 
					// console.log({staff})
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
		} else {
			 res.send({
		  status: 400,
		  msg: "wrong email or password"
		});
		}
	})
} catch (error) {
	console.log(error);
	res.status(500).json({msg: "Something went wrong!!!"})
}
   
});


module.exports = router;

  