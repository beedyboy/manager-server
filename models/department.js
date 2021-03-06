const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');  
const { checkHeader, validateName } = require('../middleware/valid');  
const router = express.Router();  
 
//get departments details by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = db('departments').where({id}).select().then( ( data ) => { 
     if(data) {
         res.send({
             status: 200,
             data
         })
     }
       else {
        res.send({
          status: 400,
          message: "Wrong information provided"
       });
      
       }
      
       });
});

//check whether departments exist
router.get("/:name/exist", (req, res) => {   
    const name = req.params.name ;
    helper.nameExist('departments', name).then( (result) => {
      console.log({result})
       res.send({exist: result}); 
    })
   
});

//get all modules
router.get("/", (req, res) => {  
const result = db('departments').select().then( ( data ) => {   

     res.send( data ).status(200); 
     });
});


//create a new departments
router.post("/", checkHeader, validateName('departments'), (req, res, next) => {   
   try {
     const {name, description} = req.body; 
    const created_at = new Date().toLocaleString(); 

    db('departments').insert({  name, description, created_at }).then( ( result ) => { 
        
        if(result) { 
            res.send( {
                status: 200,
                message: 'New department created successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Department was not created'
            })
        }
    });
   } catch(err) {
    console.log('Error', err);
   } 
});
 

//check whether departments exist
router.post("/update", checkHeader, (req, res) => {  
  try { 
    const {id, name, description} = req.body ;
    const updated_at = new Date().toLocaleString();
  db('departments').where('id', id).update( { name, description,  updated_at })
  .then( ( data ) => {  
    if(data) {
      res.send({
      status: 200, 
      message: "Department updated successfully" 
     });
    }
      else {
        res.send({
        status: 400,
        message: "Error updating department" 
      });
      } 
    
     });
             
  } catch(error) {
    console.log('error', error);
    res.send({
      status: 400,
      message: error
    })
  }
});

router.delete("/:id", checkHeader, (req, res) => { 
   try {
    db('departments').where('id', req.params.id).del().then( (result) => {
        res.send({
            status: 200,
            message: 'Department deleted successfully'
        })
    }).catch((err) => {
      console.log(err);
      res.status(500).json({
        status: 500,
        message: err
      })
    })
   } catch(error) {
    console.log(error);
       res.send({
        status: 400,
        message: error
       })
       
   }
})
module.exports = router;