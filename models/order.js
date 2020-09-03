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


//create a new order
router.post("/", (req, res) => {   
  try {
	//   check if order already exist
    let { stock_id, order_no, quantity, discount, item_price } = req.body; 
	let {sold_price } = req.body; 
	quantity = parseFloat(quantity);
	const oldQty = quantity;
    sold_price = (quantity * parseFloat(item_price)) - parseFloat(discount);
  const created_at = new Date().toLocaleString();  
  const today= new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var dd = String(today.getDate()).padStart(2, '0')
   const order_date =  mm + '/' + dd + '/' + today.getFullYear(); 
 
	db('orders').where({order_no}).andWhere({stock_id}).first().then( (data) => { 
		if(data) { 
			discount = discount + parseFloat(data.discount);
			quantity = quantity + parseFloat(data.quantity);
			sold_price = sold_price + parseFloat(data.sold_price); 
			const id = parseInt(data.id);
			db('orders').update({ quantity, discount, sold_price, created_at })
			.where({id})
			.then( ( result ) => { 
				helper.minusStock(stock_id, oldQty); 
				if(result) { 
					res.send( {
						status: 200,
						message: 'Item added successfully'
						} );
				} else {
					res.send({
						status: 204,
						message: 'Item was not created'
					})
				}
				});
		} else {
			 
			db('orders').insert({ stock_id, order_no, quantity, discount, item_price, sold_price, order_date, created_at }).then( ( result ) => {  
				if(result) {  
				helper.minusStock(stock_id, quantity); 
					res.send( {
						status: 200,
						message: 'Item added successfully'
						} );
				} else {
					res.send({
						status: 204,
						message: 'Item was not created'
					})
				}
				});
		}
		 
	})

  } catch(err) {
	console.log('cartTotal', err.code);
	console.log('cartTotal', err.message);
	console.log('cartTotal', err.stack);
  res.status(500).json({
	message: "Something went wrong!!!"
  })
  } 
}); 
router.get("/cart/:invoice/total", (req, res) => {
	try { 
		const order_no = req.params.invoice; 
		// console.log({order_no})
	  db('orders').where({order_no}).sum({p: 'sold_price'}).then( (data) => {
		if (data) { 
			res.send({
				status: 200,
				data: data[0].p
			})
		}
	  })
  
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
	const id = req.params.id;
   db('orders').where({id}).first().then( (data) => {
	   if (data) { 
		const sold = parseFloat(data.quantity);
		const stock_id = parseInt(data.stock_id);
		   db('orders').where('id', id).del().then( (result) => {
			if (result) {
				helper.plusStock(stock_id, sold);
				res.send({
					status: 200,
					message: 'Order deleted successgully'
				})
				
			} else {
				res.send({
					status: 400,
					message: 'Error deleting order'
				})
			}			
		})
	   }	   
   })
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