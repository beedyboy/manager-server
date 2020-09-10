const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const { checkHeader, validateName } = require("../middleware/valid");

const router = express.Router();

//get maintenance details by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const result = db("maintenance")
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

//get all maintenance
router.get("/", (req, res) => {
  const result = db("maintenance as m")
    .join("assets as a", "m.asset_id", "=", "a.id")
    .select("m.*", "a.title")
    .then((data) => {
      res.send(data).status(200);
    });
});

//create Allocation
router.post("/maintenance", checkHeader, (req, res) => {
  const { asset_id, cost, maintenance_date, description } = req.body;
  const created_at = new Date().toLocaleString();
  db("allocations")
    .insert({ asset_id, cost, maintenance_date, description, created_at })
    .then((result) => {
      if (result) {
        res.send({
          status: 200,
          message: "Asset taken for maintenance",
        });
      } else {
        res.send({
          status: 404,
          message: "Error sending asset for maintenance",
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/status", (req, res) => {
  const { id, status } = req.body;
  helper.updateStatus("maintenance", id, status).then((data) => {
    if (data === true) {
      res.send({
        status: 200,
        message: "Status updated successfully",
      });
    } else {
      res.send({
        status: 400,
        message: "Error updating status",
      });
    }
  });
});
module.exports = router;
