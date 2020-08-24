const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');
const {validate, checkHeader} = require('../middleware/valid'); 
const {multerUploads, dataUri} = require('../middleware/multer');  
const { cloudinary } = require('../config/cloudinary'); 

const router = express.Router(); 
  
var upload = multerUploads.single('image')

 
//get all product
router.get("/", (req, res) => {  
  db('products')  
  .join('branches as b', 'products.branch_id', '=', 'b.id')
  .join('categories as c', 'products.cat_id', '=', 'c.id')
.select('products.*', 'c.name as catName', 'b.name as branchName').then( ( data ) => {  
         res.send( data ).status(200); 
         }).catch(err => {
           console.log('all ', err);
         })
}); 
router.get("/:cat/:branch/:name/exist", (req, res) => {   
  const { cat: cat_id, branch: branch_id, name: product_name} = req.params ;
db('products').where({ cat_id, branch_id, product_name}).select().then( ( data ) => { 
 if(data.length > 0) {  
     res.send({exist: true});
   } else {
      res.send({exist: false});
   }
            
  });
});
 
router.get("/:id", (req, res) => {  
    const pid = req.params.id ; 
        db('products as p').where('p.id', pid) 
        .join('branches as b', 'b.id', '=', 'p.branch_id')
        .join('categories as c', 'c.id', '=', 'p.cat_id') 
       .select('p.*', 'c.name as catName', 'b.name as branchName').then( ( data ) => {     
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
    var image = req.file;  
    let images = '';
    
    var count = 0;
    await helper.uploader(image).then(newPath => {
      console.log(newPath.url) 
      images = newPath.url;
      count += 1; 
    })  
      
   if(count === 1) { 
    const {name: product_name,  description, branch_id, cat_id} = req.body;  
    const created_at = new Date().toLocaleString();  
    db('products').returning('id')
    .insert({ product_name, description, branch_id, cat_id, created_at }).then( ( result ) => {  
    if(result.length > 0) { 
    const updated_at = new Date().toLocaleString(); 
    //  let images = JSON.stringify(urls);  
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
    try {
      const {fullname,  role, username, id} = req.body;   
    const updated_at = new Date().toLocaleString();  
    db('products').where('id', id).update({  product_name, description, branch_id, cat_id, updated_at }).then( ( result ) => { 
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
    } catch (error) {
      console.log(error);
      res.status(500).send({
        status: 500,
        message: "Something went wrong with the server"
      })
    }
});


router.delete("/:id", (req, res) => { 
  try {
   db('products').where('id', req.params.id).del().then( (result) => {
       res.send({
           status: 200,
           message: 'Product deleted successgully'
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