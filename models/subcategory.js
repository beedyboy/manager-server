const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');  
const router = express.Router(); 
// var upload = multer({dest: 'uploads/'});
 
//get subcategory details by id
router.get("/:id", (req, res) => {
    try {
      const id = req.params.id;
    const result = db('subcategory').where({id}).select().then( ( data ) => { 
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
    } catch (error) {
      console.log(error)
    }
});

//check whether subcategory exist
router.get("/:cat_id/:sub/exist", (req, res) => {   
    const {cat_id, sub: sub_name} = req.params ;
  db('subcategory').where({ cat_id, sub_name}).select().then( ( data ) => { 
   if(data.length > 0) {  
       res.send({exist: true});
     } else {
        res.send({exist: false});
     }
              
    });
});

//get all modules
router.get("/", (req, res) => {  
 db('subcategory as s').join('categories as c', 's.cat_id', '=', 'c.id')
  .select('*', 'c.name as catName').then( ( data ) => {  
     res.send( data ).status(200); 
     });
});


router.get("/category/:id", (req, res) => {  
  const cat_id = req.params.id;
  db('subcategory as s').where({cat_id})
  .join('categories as c', 's.cat_id', '=', 'c.id')
   .select('*', 'c.name as catName').then( ( data ) => {  
      res.send( data ).status(200); 
      });
 });

//create a new subcategory
router.post("/", (req, res, next) => {   
   try {
     const {name: sub_name, description, cat_id} = req.body; 
    const created_at = new Date().toLocaleString(); 

    db('subcategory').insert({  sub_name, cat_id, description }).then( ( result ) => { 
        
        if(result) { 
            res.send( {
                status: 200,
                message: 'Sub-category created successfully'
                } );
        } else {
            res.send({
                status: 400,
                message: 'Data was not created'
            })
        }
    });
   } catch(err) {
    console.log('Error', err);
   } 
});
 

//check whether subcategory exist
router.post("/update", (req, res) => {  
  try { 
    const {id, name: sub_name, description} = req.body ;
    const updated_at = new Date().toLocaleString();
  db('subcategory').where('id', id).update( { sub_name, description,  updated_at })
  .then( ( data ) => {  
    if(data) {
      res.send({
      status: 200, 
      message: "Category updated successfully" 
     });
    }
      else {
        res.send({
        status: 400,
        message: "Error updating category" 
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

router.delete("/:id", (req, res) => { 
   try {
    db('subcategory').where('id', req.params.id).del().then( (result) => {
        res.send({
            status: 200,
            message: 'Category deleted successgully'
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