const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');
const {validate, checkHeader} = require('../middleware/valid'); 
const bcrypt = require("bcryptjs");
const multer = require('multer');
const fs = require('fs');
// const mailer = require("../plugins/mailer");
// const router = require('express').Router;

const router = express.Router();  

 

router.get("/dashboard", (req, res) => {    
      db('products').where({shop_id})
       .join('sellers as s', 'products.shop_id', '=', 's.id')
      .join('categories as c', 'products.cat_id', '=', 'c.id')
      .count('products.id as p_count')
   .select('c.name as catName',
       's.shop_name as shopName').then( ( data ) => {             
          if(data) {
              res.send({
                  status: 200,
                  data
              })
          } 
          
           }).catch(err => {
            console.error('my product', err);
          })
}); 
  
 

module.exports = router;