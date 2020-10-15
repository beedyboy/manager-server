const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');
const {validate, checkHeader} = require('../middleware/valid'); 
const {multerUploads, dataUri} = require('../middleware/multer');  
const { cloudinary } = require('../config/cloudinary'); 

const router = express.Router(); 
  
var upload = multerUploads.single('image')

 
//get all directors
router.get("/", (req, res) => {  
  db('directors')  
.select().then( ( data ) => {  
         res.send( data ).status(200); 
         }).catch(err => {
           console.log('all ', err);
         })
}); 
 
router.get("/:id", (req, res) => {  
    const did = req.params.id ; 
        db('directors as d').where('d.id', did)  
       .select().then( ( data ) => {     
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
            console.error(' directors details', err);
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
    const {firstname, lastname, position, story, date_joined} = req.body;  
    const created_at = new Date().toLocaleString();  
    db('directors').returning('id')
    .insert({ firstname, lastname, position, story, date_joined, created_at }).then( ( result ) => {  
    if(result.length > 0) { 
    const updated_at = new Date().toLocaleString();  
     db('directors').where('id', result[0]).update({ images, updated_at }).then( (data) => {
       if(data) {
         res.send({
                  status: 200,
                  message: 'New director created successfully',
                  images
              })
       }
     })  
  } else {
      res.send({
          status: 404,
          message: 'Director was not created'
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
      const {firstname, lastname, position, story, date_joined, id} = req.body;   
    const updated_at = new Date().toLocaleString();  
    db('directors').where('id', id).update({  firstname, lastname, position, story, date_joined, updated_at }).then( ( result ) => { 
   if(result) {  
            res.send( {
                status: 200,
                message: 'Director data updated successfully'
                } );
        } else {
            res.send({
                status: 204,
                message: 'Director was not updated'
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
   db('directors').where('id', req.params.id).del().then( (result) => {
       res.send({
           status: 200,
           message: 'Director deleted successgully'
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