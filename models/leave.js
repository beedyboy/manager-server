const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const { checkHeader, validateName } = require("../middleware/valid");
const router = express.Router();

/**
 * Leave types section
 */

router.get("/", (req, res) => {
  try {
    const result = db("leaves")
    .select()
    .then((data) => {
      res.send(data).status(200);
    });
    
  } catch (error) {
    console.log({error})
  }
});
 
router.get("/:leave_type/exist", (req, res) => {  
  const leave_type = req.params.leave_type ;
  db("leaves").where({leave_type}).select().then((data) => {
    if(data.length > 0) {  
      res.send({exist: true}); 
  } else {
    res.send({exist: false}); 
  }
  }) 
 
});
router.post("/", checkHeader, (req, res, next) => {
  try {
    const { leave_type, allowed_days, description } = req.body;
    const created_at = new Date().toLocaleString();

    db("leaves")
      .insert({ leave_type, allowed_days, description, created_at })
      .then((result) => {
        if (result) {
          res.send({
            status: 200,
            message: "Leave created successfully",
          });
        } else {
          res.send({
            status: 204,
            message: "Leave was not created",
          });
        }
      });
  } catch (err) {
    console.log("Error", err);
  }
});

 /**
  * Leave applications down here
  */
//get leave_applications details by id
router.get("/application/:id", (req, res) => {
  const id = req.params.id; 
  const result = db("leave_applications as a")
  .where('a.id', id) 
    .join("leaves as l", "a.leave_type_id", "=", "l.id")
    .join("staffs as s", "a.staff_id", "=", "s.id")
    .select("a.*", "l.leave_type", "l.allowed_days", "s.firstname", "s.lastname") 
    .then((data) => {
      if (data) {
        res.send({
          status: 200,
          data,
        });
      } else {
        res.send({
          status: 400,
          message: "Wrong information provided",
        });
      }
    });
});
 

//get all leave_applications
router.get("/application/", (req, res) => {
  const result = db("leave_applications as a")
  .join("leaves as l", "a.leave_type_id", "=", "l.id")
  .select("a.*", "l.leave_type") 
    .then((data) => {
      res.send(data).status(200);
    });
});

//get all my app
router.get("/myapplication/", checkHeader, (req, res) => { 
 try {
  const staff_id = parseInt(req.user.id); 
  db("leave_applications as a")
    .where({staff_id}) 
    .join("leaves as l", "a.leave_type_id", "=", "l.id")
    .select("a.*", "l.leave_type") 
    .then((data) => {
      res.send(data).status(200);
    });
   
 } catch (error) {
   console.log({error})
 }
});

//create a new leave_applications
router.post("/myapplication/", checkHeader, (req, res, next) => {
  try {
    const { leave_type_id, description, leave_start_date, leave_end_date } = req.body;
    const created_at = new Date().toLocaleString();
    const staff_id = parseInt(req.user.id);
    db("leave_applications")
      .insert({ staff_id, leave_type_id, description, leave_start_date, leave_end_date, created_at })
      .then((result) => {
        if (result) {
          res.send({
            status: 200,
            message: "Leave Application created successfully",
          });
        } else {
          res.send({
            status: 204,
            message: "Application was not created",
          });
        }
      });
  } catch (err) {
    console.log("Error", err);
  }
});

//check whether leave_applications exist
router.post("/myapplication/update", checkHeader, (req, res) => {
  try {
    const { id, title, doc_type, description } = req.body;
    const updated_at = new Date().toLocaleString();
    db("leave_applications")
      .where("id", id)
      .update({ title, doc_type, description, updated_at })
      .then((data) => {
        if (data) {
          res.send({
            status: 200,
            message: "Document updated successfully",
          });
        } else {
          res.send({
            status: 400,
            message: "Error updating document",
          });
        }
      });
  } catch (error) {
    console.log("error", error);
    res.send({
      status: 400,
      message: error,
    });
  }
});
router.post("/status", (req, res) => {
  const { id, admin_remark, status } = req.body;
  helper.updateStatus("leave_applications", id, admin_remark, status).then((data) => {
    if (data === true) {
      res.send({
        status: 200,
        message: "Application updated successfully",
      });
    } else {
      res.send({
        status: 400,
        message: "Error updating application",
      });
    }
  });
});
router.delete("/myapplication/:id", checkHeader, (req, res) => {
  try {
    db("leave_applications")
      .where("id", req.params.id)
      .del()
      .then((result) => {
        res.send({
          status: 200,
          message: "Document deleted successfully",
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          status: 500,
          message: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.send({
      status: 400,
      message: error,
    });
  }
});
module.exports = router;
