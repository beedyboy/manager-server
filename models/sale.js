const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper'); 
const fs = require('fs');

const router = express.Router();
 
//get stocks details by id
router.get("/", (req, res) => {
	const order_no = req.params.invoice;
	 db('sales as o').where({order_no}).select().then( ( data ) => { 
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

 

//create a new stocks
router.post("/", (req, res) => {   
  try {
	const { order_no,  total, customer_id, fullname, email, phone, respondent } = req.body; 
  const created_at = new Date().toLocaleString();  
  const sales_date= new Date().getDate();
  db('orders').insert({  order_no,  total, customer_id, fullname, email, phone, sales_date, respondent, created_at }).then( ( result ) => {  
  if(result) { 
	  res.send( {
		  status: 200,
		  message: 'Order completed successfully'
		  } );
  } else {
	  res.send({
		  status: 204,
		  message: 'Order was not created'
	  })
  }
  });
  } catch(err) {
  console.log({err});
  res.status(500).json({
	message: "Something went wrong!!!"
  })
  } 
}); 
 

//check whether stocks exist
router.post("/update", (req, res) => {  
	const {id, order_no,  total, customer_id, fullname, email, phone, sales_date, respondent,} = req.body ;
	const updated_at = new Date().toLocaleString();
  db('sales').where('id', id).update( {order_no,  total, customer_id, fullname, email, phone, sales_date, respondent,  updated_at })
  .then( ( data ) => {  
	if(data) {
	  res.send({
	  status: 200, 
	  message: "Order updated successfully" 
	 });
	}
	  else {
		res.send({
		status: 400,
		message: "Error updating order" 
	  });
	  }
	
	
	 });
			 
});


router.delete("/:id", (req, res) => { 
  try {
   db('sales').where('id', req.params.id).del().then( (result) => {
       res.send({
           status: 200,
           message: 'Order deleted successgully'
       })
   } )
  } catch(error) {
   console.log(error);
      res.send({
       status: 400,
       message: error
      })
      
  }
})

router.delete("/bulk/:arr", (req, res) => { 
  try {
	  var arr = req.params.arr; 
   db('sales').whereIn('id', arr).del().then( (result) => {
       res.send({
           status: 200,
           message: 'Sales deleted successgully'
       })
   } )
  } catch(error) {
   console.log(error);
      res.send({
       status: 400,
       message: error
      })
      
  }
})
module.exports = router;