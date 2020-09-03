const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');   
const moment =  require('moment');

const router = express.Router();
const dateFormat = 'YYYY/MM/DD';
// const dateFormat = 'MM/DD/YYYY';
 
//get sales report
router.post("/sales", (req, res) => {
	let {  start_date, end_date  } = req.body;
	// start_date =  moment(start_date, dateFormat);
	// end_date =  moment(end_date, dateFormat);
	
	console.log({  start_date  }, end_date)
	 db('sales')
	 .select()
	 .whereBetween('sales_date', [ start_date, end_date ])
	 .then( ( data ) => {  
	  if(data) {
		  res.send({
			  status: 200,
			  data
		  })
	  } else {
		res.send({
		  status: 400,
		  message: "Wrong information provided"
		});
	  
		}
	  
		});
});

 
router.post("/assets", (req, res) => {
	const {  start_date, end_date  } = req.body;
	 db('assets')
	 .select()
	 .whereBetween('purchased_date', [ start_date, end_date ])
	 .then( ( data ) => {  
	  if(data) {
		  res.send({
			  status: 200,
			  data
		  })
	  } else {
		res.send({
		  status: 400,
		  message: "Wrong information provided"
		});
	  
		}
	  
		});
});


module.exports = router;