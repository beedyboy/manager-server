const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
// const {validate, checkHeader} = require('../middleware/valid');
const router = express.Router();

router.post("/", (req, res) => {
  try {
    const {
      sub_id,
      name: title,
      purchased_price,
      serial,
      company_name,
      condition,
      start_date,
      end_date,
      description,
      purchased_date,
    } = req.body;
    const created_at = new Date().toLocaleString();
    db("assets")
      .returning("id")
      .insert({
        sub_id,
        title,
        purchased_price,
        serial,
        description,
        company_name,
        condition,
        start_date,
        end_date,
        purchased_date,
        created_at,
      })
      .then((data) => {
        if (data) {
          res.json({
            status: 200,
            message: "New asset added successfully",
          });
        } else {
          res.json({
            status: 400,
            message: "Asset was not added",
          });
        }
      })
      .catch((err) => {
        console.log({ err });
        res.status(500).json({
          status: 500,
          message: "Something went wrong with your request",
        });
      });
  } catch (error) {
    console.log("asset", error);
    res.status(500).send({
      status: 500,
      message: "Something went wrong with the server",
    });
  }
});

router.post("/update", (req, res) => {
  try {
    const {
      id,
      sub_id,
      name: title,
      purchased_price,
      serial,
      description,
      purchased_date,
    } = req.body;
    const updated_at = new Date().toLocaleString();
    db("assets")
      .returning("id")
      .where("id", id)
      .update({
        sub_id,
        title,
        purchased_price,
        serial,
        description,
        purchased_date,
        updated_at,
      })
      .then((data) => {
        if (data) {
          res.json({
            status: 200,
            message: "Asset updated successfully",
          });
        } else {
          res.json({
            status: 400,
            message: "Asset was not updated",
          });
        }
      })
      .catch((err) => {
        console.log({ err });
        res.status(500).json({
          status: 500,
          message: "Something went wrong with your request",
        });
      });
  } catch (error) {
    console.log("asset", error);
    res.status(500).send({
      status: 500,
      message: "Something went wrong with the server",
    });
  }
});

router.get("/", (req, res) => {
  try {
    db("assets as a")
      .join("subcategory as s", "a.sub_id", "=", "s.id")
      .select("a.*", "s.sub_name as subName", "s.cat_id")
      .then((data) => {
        if (data) {
          res.send({
            status: 200,
            data,
          });
        } else {
          res.send({
            status: 400,
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Something went wrong with the server",
    });
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = parseFloat(req.params.id);
    db("assets as a")
      .where("a.id", id)
      .join("subcategory as s", "a.sub_id", "=", "s.id")
      .select("a.*", "s.sub_name as subName", "s.cat_id")
      .then((data) => {
        if (data) {
          res.send({
            status: 200,
            data,
          });
        } else {
          res.send({
            status: 400,
          });
        }
      });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Something went wrong with the server",
    });
  }
});

router.get("/:sub/:title/exist", (req, res) => {
  try {
    const { sub: sub_id, title } = req.params;
    db("assets as a")
      .where({ sub_id, title })
      .select()
      .then((data) => {
        if (data.length > 0) {
          res.send({ exist: true });
        } else {
          res.send({ exist: false });
        }
      });
  } catch (error) {
    res.status(500).send({
      status: 500,
      message: "Something went wrong with the server",
    });
  }
});
router.post("/bulk/transfer", (req, res) => {
  try {
    var arr = req.body;
    console.log({ arr });
    //    db('stocks').whereIn('id', arr).del().then( (result) => {
    //        res.send({
    //            status: 200,
    //            message: 'Stock deleted successgully'
    //        })
    //    } )
  } catch (error) {
    //    console.log(error);
    res.send({
      status: 400,
      message: error,
    });
  }
});
module.exports = router;
