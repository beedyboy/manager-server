const express = require('express');
const db = require('../config/knex'); 
const helper = require('../lib/helper');
const {validate, checkHeader} = require('../middleware/valid'); 
const router = express.Router(); 

router.post('/', (req, res) => {
    try {
       const { sub_id, name:title, purchased_price, serial, description, condition, purchased_date } = req.body;
       const created_at = new Date().toLocaleString();  
        db('assets').returning('id')
        .insert({sub_id, title, purchased_price, serial, description, condition, purchased_date, created_at})
        .then( (data) => {
            if(data.length > 0) {
                res.json({
                    status: 200,
                    message: "New asset added successfully"
                })
            } else {
                res.json({
                    status: 400,
                    message: "Asset was not added"
                })
            }
        }).catch((err) => {
            res.status(500).json({
                status: 500,
                message: "Something went wrong with your request"
            })
        })
    } catch (error) {
        console.log('asset', error)
        res.status(500).send({
            status: 500,
            message: 'Something went wrong with the server'
        })
    }
});

router.get('/', (req, res) => {
    try {
        db('assets as a')
    .join('subcategory as s', 'a.sub_id', '=', 's.id')
    .select('a.*', 's.sub_name as subName').then((data) => {
        console.log({data})
       if(data) {
        res.send({
            status: 200,
            data
        })
       } else {
        res.send({
            status: 400
        })
       }
    })        
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: 'Something went wrong with the server'
        })
    }
})


router.get('/:sub/:title/exist', (req, res) => {
    try {
        const {sub: sub_id, title} = req.params;
        db('assets as a').where({sub_id, title}).select().then((data) => {
        if(data.length > 0) {  
            res.send({exist: true});
          } else {
             res.send({exist: false});
          }     
    })        
    } catch (error) {
        res.status(500).send({
            status: 500,
            message: 'Something went wrong with the server'
        })
    }
})
module.exports = router;