const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const { checkHeader, validateName } = require("../middleware/valid");
const router = express.Router();

//get leaves details by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const result = db("leaves")
    .where({ id })
    .select()
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

//check whether leaves exist
router.get("/:doc_type/exist", (req, res) => {
  const doc_type = req.params.name;
  helper.nameExist("leaves", doc_type).then((result) => {
    res.send({ exist: result });
  });
});

//get all modules
router.get("/", (req, res) => {
  const result = db("leaves")
    .select()
    .then((data) => {
      res.send(data).status(200);
    });
});

//create a new leaves
router.post("/", checkHeader, (req, res, next) => {
  try {
    const { doc_type, title, description } = req.body;
    const created_at = new Date().toLocaleString();

    db("leaves")
      .insert({ doc_type, title, description, created_at })
      .then((result) => {
        if (result) {
          res.send({
            status: 200,
            message: "New document created successfully",
          });
        } else {
          res.send({
            status: 204,
            message: "Document was not created",
          });
        }
      });
  } catch (err) {
    console.log("Error", err);
  }
});

//check whether leaves exist
router.post("/update", checkHeader, (req, res) => {
  try {
    const { id, title, doc_type, description } = req.body;
    const updated_at = new Date().toLocaleString();
    db("leaves")
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

router.delete("/:id", checkHeader, (req, res) => {
  try {
    db("leaves")
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
