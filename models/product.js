const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');
const {validate, checkHeader} = require('../middleware/valid'); 
const {multerUploads, dataUri} = require('../middleware/multer'); 
const bcrypt = require("bcryptjs"); 
const fs = require('fs'); 
const { cloudinary } = require('../config/cloudinary'); 

const router = express.Router(); 
  
var upload = multerUploads.array('image')

 
//get all product
router.get("/all", (req, res) => {  
  db('products')  
  .join('categories as c', 'products.cat_id', '=', 'c.id')
.select('products.*', 'c.name as catName').then( ( data ) => {  
         res.send( data ).status(200); 
         }).catch(err => {
           console.log('all ', err);
         })
});

 
 
router.get("/:id", (req, res) => {  
    const pid = req.params.id ; 
        db('products as p').where('p.id', pid) 
       .join('categories as c', 'c.id', '=', 'p.cat_id') 
       .select('p.*', 'c.name as catName').then( ( data ) => {     
         if(data) {
            res.send({
                status: 200,
                data
            })
        } else {
           res.send({
             status: 400
          });
        }   }).catch(err => {
            console.error(' product details', err);
          })
}); 


router.post("/",  checkHeader, upload, async (req, res) => {  
  try { 
     let urls = [];
     var image = req.files;
     var imageSize = Object.keys(image).length;  
     let count = 0; 

     for (const [key, value] of Object.entries(image)) { 
       await helper.uploader(value).then(newPath => {
          console.log(newPath.url) 
          urls.push(newPath.url); 
    })  
       count += 1;
     } 
   if(count === imageSize) { 
    const {name: product_name,  description, branch_id, cat_id} = req.body;  
    const created_at = new Date().toLocaleString(); 
    let { tags } = req.body;
    tags = JSON.parse(tags).toString(); 
    db('products').returning('id')
    .insert({ product_name, description, branch_id, cat_id, created_at }).then( ( result ) => {  
    if(result.length > 0) { 
    const updated_at = new Date().toLocaleString(); 
     let images = JSON.stringify(urls);  
     db('products').where('id', result[0]).update({ images, updated_at }).then( (data) => {
       if(data) {
         res.send({
                  status: 200,
                  message: 'New product created successfully',
                  images
              })
       }
     })  
  } else {
      res.send({
          status: 404,
          message: 'Product was not created'
      })
  }
    }).catch(err => {
      console.log(err);
      res.status(500).json({message: "Something went wrong!!!"})
    })
   }
  } catch (error) {
    console.log(error);
  }
  
});


router.post("/update", (req, res) => {   
    const {fullname,  role, username, id} = req.body;   
    const updated_at = new Date().toLocaleString();  
    let response = null; 
    db('products').where('id', id).update({ product_name, description, branch_id, cat_id, updated_at }).then( ( result ) => { 
   if(result) { 

            res.send( {
                status: 200,
                message: 'Product updated successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Product was not updated'
            })
        }
    }); 
});



module.exports = router;