const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');  
const { checkHeader } = require('../middleware/valid');  
const router = express.Router();  
 
//get marketing details by id
router.get("/:id", (req, res) => {
    const id = req.params.id;
    const result = db('marketing').where({id}).select().then( ( data ) => { 
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

//check whether marketing exist
router.get("/:name/exist", (req, res) => {   
    const name = req.params.name ;
    helper.nameExist('marketing', name).then( (result) => {
      console.log({result})
       res.send({exist: result}); 
    })
   
});

//get all modules
router.get("/", (req, res) => {  
const result = db('marketing').select().then( ( data ) => {   

     res.send( data ).status(200); 
     });
});


//create a new marketing
router.post("/", checkHeader, (req, res, next) => {   
   try {
     const {url_link, description} = req.body; 
    const created_at = new Date().toLocaleString(); 

    db('marketing').insert({  url_link, description, created_at }).then( ( result ) => { 
        console.log({result})
        if(result) { 
            res.send( {
                status: 200,
                message: 'New URL Link created successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Link was not created'
            })
        }
    });
   } catch(err) {
    console.log('Error', err);
   } 
});
 

//check whether marketing exist
router.post("/update", checkHeader, (req, res) => {  
  try {
 
    const {id, url_link, description} = req.body ;
    const updated_at = new Date().toLocaleString();
  db('marketing').where('id', id).update( { url_link, description,  updated_at })
  .then( ( data ) => {  
    if(data) {
      res.send({
      status: 200, 
      message: "URL Link updated successfully" 
     });
    }
      else {
        res.send({
        status: 400,
        message: "Error updating link" 
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
    db('marketing').where('id', req.params.id).del().then( (result) => {
        res.send({
            status: 200,
            message: 'Category deleted successfully'
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