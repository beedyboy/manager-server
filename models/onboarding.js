const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const router = express.Router();
const mailer = require("../plugins/mailer");
const { validate, checkHeader } = require("../middleware/valid");

router.post("/", checkHeader, (req, res) => {
  try {
    const { staff_id } = req.body;
    const pre_contract = JSON.stringify(req.body.pre_contract);
    const general = JSON.stringify(req.body.general);
    const student = JSON.stringify(req.body.student);
    const para_professional = JSON.stringify(req.body.para_professional);
    const professional = JSON.stringify(req.body.professional);
    const marketing = JSON.stringify(req.body.marketing);
    const management_executive = JSON.stringify(req.body.management_executive);
    const post_contract = JSON.stringify(req.body.post_contract);
 
    const updated_at = new Date().toLocaleString();
    const onboarded = "Yes";
    db("staffs")
    .where("id", staff_id)
      .update({ 
        pre_contract,
        general,
        student,
        para_professional,
        professional,
        marketing,
        management_executive,
        post_contract,
        onboarded,
        updated_at
      })
      .then((reply) => {
        if (reply) {
          res.send({
            status: 200,
            message: "Staff onboarded successfully",
          });
        } else {
          res.send({ status: 404, message: "Staff was not onboarded" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}) 
router.put("/", validate("staffs"), (req, res) => {
  try {
    const { id } = req.body;
    const pre_contract = JSON.stringify(req.body.pre_contract);
    const general = JSON.stringify(req.body.general);
    const student = JSON.stringify(req.body.student);
    const para_professional = JSON.stringify(req.body.para_professional);
    const professional = JSON.stringify(req.body.professional);
    const marketing = JSON.stringify(req.body.marketing);
    const management_executive = JSON.stringify(req.body.management_executive);
    const post_contract = JSON.stringify(req.body.post_contract);
    db("onboarding")
    .where("id", id)
    .update({ 
        pre_contract,
        general,
        student,
        para_professional,
        professional,
        marketing,
        management_executive,
        post_contract,
      })
      .then((result) => {
        if (result) {
          res.send({
            status: 200,
            message: "Data saved successfully",
          });
        } else {
          res.send({
            status: 204,
            message: "Data was not saved",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
 
module.exports = router;
