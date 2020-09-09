const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const { checkHeader } = require("../middleware/valid");

const router = express.Router();

//get conversations details by ticket_id
router.get("/:id", (req, res) => {
  const ticket_id = req.params.id;
  db("conversations")
    .where({ ticket_id })
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

//create a new conversations
router.post("/", checkHeader, (req, res, next) => {
  try {
    const { ticket_id, description, respondent } = req.body;
    const created_at = new Date().toLocaleString();
    db("conversations")
      .insert({ ticket_id, description, respondent, created_at })
      .then((result) => {
        if (result) {
          res.send({
            status: 200,
            message: "New conversations created successfully",
          });
        } else {
          res.send({
            status: 204,
            message: "Conversation was not created",
          });
        }
      });
  } catch (err) {
    console.log("Error", err);
  }
});

//check whether conversations exist
router.post("/update", checkHeader, (req, res) => {
  try {
    const { id, ticket_id, description, respondent } = req.body;
    const updated_at = new Date().toLocaleString();
    db("conversations")
      .where("id", id)
      .update({ ticket_id, description, respondent, updated_at })
      .then((data) => {
        if (data) {
          res.send({
            status: 200,
            message: "Conversation updated successfully",
          });
        } else {
          res.send({
            status: 400,
            message: "Error updating conversations",
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
    db("conversations")
      .where("id", req.params.id)
      .del()
      .then((result) => {
        res.send({
          status: 200,
          message: "Conversation deleted successfully",
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
