const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper'); 
const fs = require('fs');

const router = express.Router();
 
//get stocks details by id
router.get("/:invoice", (req, res) => {
	const order_no = req.params.invoice;
	 db('orders as o').where({order_no})
	 .join('stocks as s', 'o.stock_id', '=', 's.id') 
	 .join('products as p', 's.product_id', '=', 'p.id') 
	.select('o.*', 's.stock_name', 'p.product_name').then( ( data ) => { 
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

 
//get stocks details by id
router.get("/cart/:invoice", (req, res) => {
  const order_no = req.params.invoice;
  console.log({order_no});
	 db('orders as o').where({order_no})
	 .join('stocks as s', 'o.stock_id', '=', 's.id') 
	 .join('products as p', 's.product_id', '=', 'p.id') 
	.select('o.*', 's.stock_name', 'p.product_name').then( ( data ) => {  
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
    const { stock_id, order_no, quantity, discount, item_price } = req.body; 
    let {sold_price } = req.body; 
    sold_price = quantity * item_price;
  const created_at = new Date().toLocaleString(); 
  
  const today= new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var dd = String(today.getDate()).padStart(2, '0')
   const order_date =  mm + '/' + dd + '/' + today.getFullYear(); 
 
  db('orders').insert({ stock_id, order_no, quantity, discount, item_price, sold_price, order_date, created_at }).then( ( result ) => {  
  if(result) { 
	  res.send( {
		  status: 200,
		  message: 'Order created successfully'
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
	const {id, order_no, quantity, discount, item_price, sold_price, order_date} = req.body ;
	const updated_at = new Date().toLocaleString();
  db('orders').where('id', id).update( { order_no, quantity, discount, item_price, sold_price, order_date,  updated_at })
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
   db('orders').where('id', req.params.id).del().then( (result) => {
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
	  console.log({arr});
   db('stocks').whereIn('order_no', arr).del().then( (result) => {
       res.send({
           status: 200,
           message: 'Stock deleted successgully'
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