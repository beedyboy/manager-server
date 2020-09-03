const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');  
const { useDate } = require('../lib/function');  

const router = express.Router();
 
//get sales details by id
router.get("/", (req, res) => { 
	 db('sales').select().then( ( data ) => { 
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

// get receivables
router.get("/receivables", (req, res) => { 
   db('sales').whereRaw('status = ?', ['UNPAID'])
   .select().then( ( data ) => { 
	  if(data) {
		  res.send({
			  status: 200,
			  data
		  })
	  } else {
		res.send({
		  status: 400,
		  message: "No available data"
		});	  
		}	  
		});
}); 

router.get("/invoice/:invoice/search", (req, res) => {  
	const order_no = req.params.invoice; 
	db('sales as s').where('s.order_no', 'ilike', `%${order_no}%`) 
	.select().then( ( data ) => {    
		 res.status(200).json({
		   status: 200,
		   data
		 })
		  });
  });

router.post("/", (req, res) => {   
  try {
	const { order_no,  customer_id, fullname, email, status, phone, respondent } = req.body; 
  const created_at = new Date().toLocaleString();   
    const sales_date = useDate(); 
    db('orders').where({order_no}).sum({p: 'sold_price'}).then( (data) => {
      if (data) { 
        const total = data[0].p;
        db('sales').insert({  order_no,  total, customer_id, status, fullname, email, phone, sales_date, respondent, created_at }).then( ( result ) => {  
          if(result) { 
            res.send( {
              status: 200,
              message: 'Transaction completed successfully'
              } );
          } else {
            res.send({
              status: 400,
              message: 'Transaction was not created'
            })
          }
          });
      } else {
        res.send({
          status: 400,
          message: 'Transaction was not created'
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
 

router.get("/:id/pay", (req, res) => {  
	const id = req.params.id; 
  helper.updateStatus('sales', id, 'PAID').then( ( data ) => {  
    if(data === true) {
      res.send({
      status: 200, 
      message: "Payment completed successfully" 
     });
    }
      else {
      res.send({
      status: 400,
      message: "Error in making payment" 
      });
      } 
     });
  });

router.post("/status", (req, res) => {  
	const {id, status} = req.body ;
	helper.updateStatus('sales', id, status).then( ( data ) => {  
	if(data === true) {
	  res.send({
	  status: 200, 
	  message: "Sales updated successfully" 
	 });
	}
	  else {
		res.send({
		status: 400,
		message: "Error updating sales" 
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