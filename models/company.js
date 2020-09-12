const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const router = express.Router();

router.get("/getProfile", (req, res) => {
  const id = 1;
  const result = db("company")
    .where({ id })
    .first()
    .then((data) => {
      if (data) {
        res.send({
          status: 200,
          data,
        });
      }
    });
}); 

router.post("/", (req, res) => {
  const { name: companyname, address, appname, email, phone } = req.body;
  db("company")
    .where("id", 1)
    .update({ companyname, address, appname, email, phone })
    .then((result) => {
      if (result) {
        res.send({
          status: 200,
          message: "Profile updated successfully",
        });
      } else {
        res.send({
          status: 204,
          message: "Account not updated",
        });
      }
    });
});
//get branch details by id
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const result = db("branches")
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

module.exports = router;
