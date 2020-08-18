const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');
const { getRandomNo } = require('../lib/function'); 
const { checkHeader } = require('../middleware/valid'); 
const bcrypt = require("bcryptjs");

const router = express.Router();

  
//create Allocation
router.post("/individual",  checkHeader, (req, res) => {  
    const { product_id,  staff_id, quantity, dept_id, note } = req.body;  
    const created_at = new Date().toLocaleString(); 
    const type = "Individual"
    db('allocations')
    .insert({  product_id, staff_id, quantity, dept_id, note, type, created_at }).then( ( result ) => { 
    if(result) { 
         res.send({
                    status: 200,
                    message: 'Product allocated successfully'
                    })
        } else {
            res.send({
                status: 404,
                message: 'Error allocating product'
            })
        }
    }).catch(err => {
      console.log(err);
    })
});

router.post("/departmental",  checkHeader, (req, res) => {  
    const { product_id,  branch_id, quantity, dept_id, note } = req.body;  
    const created_at = new Date().toLocaleString(); 
    const type = "Departmental"
    db('allocations')
    .insert({  product_id, branch_id, quantity, dept_id, note, type, created_at }).then( ( result ) => { 
    if(result) { 
         res.send({
                    status: 200,
                    message: 'Product allocated successfully'
                    })
        } else {
            res.send({
                status: 404,
                message: 'Error allocating product'
            })
        }
    }).catch(err => {
      console.log(err);
    })
});
//fetch all products under me
router.get("/myproducts", checkHeader, (req, res) => {
     const staff_id = req.user.staff_id;  
     db('allocations').where({staff_id})
     .join('products as p', 'allocations.product_id', '=', 'p.id')
     .select('allocations.*', 'p.product_name').then( (data) => {
       if(data) {
              res.send({
                  status: 200,
                  data
              })
          }
            
     }).catch(err => {
       console.log(err);
     })

  }); 

module.exports = router;