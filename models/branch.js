const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');  
const { checkHeader, validateName } = require('../middleware/valid');  
 
const router = express.Router();  
   
//get branch details by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = db('branches').where({id}).select().then( ( data ) => { 
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

//check whether branches exist
router.get("/:name/exist", (req, res) => {   
    const name = req.params.name ;
    helper.nameExist('branches', name).then( (result) => {
      console.log({result})
       res.send({exist: result}); 
    })
   
});

//get all branches
router.get("/", (req, res) => {  
const result = db('branches').select().then( ( data ) => {  
     res.send( data ).status(200); 
     });
});


//create a new branches
router.post("/", checkHeader, validateName('branches'), (req, res, next) => {   
   try {
     const {name, address, email,  phone} = req.body; 
    const created_at = new Date().toLocaleString();  
    db('branches').insert({  name, address, email,  phone, created_at }).then( ( result ) => { 
        
        if(result) { 
            res.send( {
                status: 200,
                message: 'New branch created successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Branch was not created'
            })
        }
    });
   } catch(err) {
    console.log('Error', err);
   } 
});
 

//check whether branches exist
router.post("/update", checkHeader, (req, res) => {  
  try { 
    const {id, name, address, email,  phone} = req.body ;
    const updated_at = new Date().toLocaleString();
  db('branches').where('id', id).update( { name, address, email,  phone,  updated_at })
  .then( ( data ) => {  
    if(data) {
      res.send({
      status: 200, 
      message: "Branch updated successfully" 
     });
    }
      else {
        res.send({
        status: 400,
        message: "Error updating branch" 
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
    db('branches').where('id', req.params.id).del().then( (result) => {
        res.send({
            status: 200,
            message: 'Branch deleted successfully'
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