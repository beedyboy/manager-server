const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');  
const { checkHeader } = require('../middleware/valid');  

const router = express.Router();
 
//get all tickets
router.get("/", (req, res) => { 
	 db('tickets as t')
	 .join('staffs as s', 's.id', '=', 't.staff_id')
	 .select('t.*', 's.firstname', 's.lastname').then( ( data ) => { 
		//  console.log({data})
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

router.get("/:id", (req, res) => {
	const id = req.params.id;
	 db('tickets').where({id}).select().then( ( data ) => { 
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

 

//create a new ticket
router.post("/", checkHeader, (req, res) => {   
  try {
	const staff_id = req.user.id;  
	const { name: title, description, email, requester, category, priority } = req.body; 
  const created_at = new Date().toLocaleString();   
  const today= new Date();
  var mm = String(today.getMonth() + 1).padStart(2, '0')
  var dd = String(today.getDate()).padStart(2, '0')
  const ticket_date = mm + '/' + dd + '/' + today.getFullYear();
  db('tickets').insert({ title, description, email, staff_id, ticket_date, requester, category, priority, created_at }).then( ( result ) => {  
  if(result) { 
	  res.send( {
		  status: 200,
		  message: 'Ticket created successfully'
		  } );
  } else {
	  res.send({
		  status: 204,
		  message: 'Ticket was not created'
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
 

//update ticket details
router.post("/update", (req, res) => {  
	const {id, title, description, email, staff_id, ticket_date, requester, category, priority} = req.body ;
	const updated_at = new Date().toLocaleString();
  db('tickets').where('id', id).update( { title, description, email, staff_id, ticket_date, requester, category, priority,  updated_at })
  .then( ( data ) => {  
	if(data) {
	  res.send({
	  status: 200, 
	  message: "Ticket updated successfully" 
	 });
	}
	  else {
		res.send({
		status: 400,
		message: "Error updating ticket" 
	  });
	  }
	
	
	 });
			 
});

//give a task to a manager
router.post("/assign", (req, res) => {  
	const {id, assigned_to} = req.body ;
	const updated_at = new Date().toLocaleString();
  db('tickets').where('id', id).update( { assigned_to,  updated_at })
  .then( ( data ) => {  
	if(data) {
	  res.send({
	  status: 200, 
	  message: "Ticket updated successfully" 
	 });
	}
	  else {
		res.send({
		status: 400,
		message: "Error updating ticket" 
	  });
	  }
	
	
	 });
			 
});
//toggle status
router.post("/status", (req, res) => {  
	const {id, status} = req.body ;
	helper.updateStatus('tickets', id, status).then( ( data ) => {  
	if(data === true) {
	  res.send({
	  status: 200, 
	  message: "Ticket updated successfully" 
	 });
	}
	  else {
		res.send({
		status: 400,
		message: "Error updating ticket" 
	  });
	  } 
	 });
			 
});
router.delete("/:id", (req, res) => { 
  try {
   db('tickets').where('id', req.params.id).del().then( (result) => {
       res.send({
           status: 200,
           message: 'Ticket deleted successgully'
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