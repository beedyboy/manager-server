const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper'); 
const fs = require('fs');

const router = express.Router();
 
//get stocks details by id
router.get("/:id", (req, res) => {
	const id = req.params.id;
	const result = db('stocks').where({id}).select().then( ( data ) => { 
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


//get all stocks in a product
router.get("/product/:id", (req, res) => {  
  const product_id = req.params.id;
  db('stocks').where({product_id})
  .select().then( ( data ) => {    
	   res.status(200).json({
		 status: 200,
		 data
	   })
		});
});

// get product stock by name
router.get("/product/:name/search", (req, res) => {  
	const name = req.params.name; 
	db('products as p').where('p.product_name', 'ilike', `%${name}%`)
	.join('stocks as s',  's.product_id', '=', 'p.id')
	.select('s.*', 'p.product_name', 'p.images').then( ( data ) => {    
		 res.status(200).json({
		   status: 200,
		   data
		 })
		  });
  });
//create a new stocks
router.post("/", (req, res) => {   
  try {
	const { stock_name, quantity, expiry, price, product_id } = req.body; 
  const created_at = new Date().toLocaleString();  

  db('stocks').insert({ stock_name, quantity, expiry, price, product_id, created_at }).then( ( result ) => {  
  if(result) { 
	  res.send( {
		  status: 200,
		  message: 'Stock created successfully'
		  } );
  } else {
	  res.send({
		  status: 204,
		  message: 'Stock was not created'
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
	const {id, stock_name, quantity, expiry, price, product_id} = req.body ;
	const updated_at = new Date().toLocaleString();
  db('stocks').where('id', id).update( { stock_name, quantity, expiry, price, product_id,  updated_at })
  .then( ( data ) => {  
	if(data) {
	  res.send({
	  status: 200, 
	  message: "Stock updated successfully" 
	 });
	}
	  else {
		res.send({
		status: 400,
		message: "Error updating stocks" 
	  });
	  }
	
	
	 });
			 
});


router.delete("/:id", (req, res) => { 
  try {
   db('stocks').where('id', req.params.id).del().then( (result) => {
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

router.delete("/bulk/:arr", (req, res) => { 
  try {
	  var arr = req.params.arr; 
   db('stocks').whereIn('id', arr).del().then( (result) => {
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