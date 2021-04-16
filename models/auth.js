const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const { validate } = require("../middleware/valid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  requestPasswordReset,
  resetPassword,
} = require("../services/auth.service");

const router = express.Router();

router.post("/auth", (req, res) => {
  try {
    const { email } = req.body;
    db("logins")
      .where({ email })
      .select()
      .then((user) => {
        if (user.length > 0) {
          const data = user[0];
          if (bcrypt.compareSync(req.body.password, data.password)) {
            const token = helper.generateToken(data);
            helper.setSignature(data.id, token).then((rep) => {
              user.token = token;
              if (rep === true) {
                db("staffs")
                  .where("id", data.staff_id)
                  .select("staffs.firstname", "staffs.lastname", "staffs.acl")
                  .then((staff) => {
                    // const staff =  payload[0];
                    // console.log({staff})
                    res.json({
                      status: 200,
                      user,
                      token,
                      staff,
                      msg: "Login successful",
                    });
                  });
              }
            });
          } else {
            res.send({
              status: 400,
              msg: "wrong email or password",
            });
          }
        } else {
          res.send({
            status: 400,
            msg: "wrong email or password",
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Something went wrong!!!" });
  }
});

router.post("/reset-request", async (req, res) => {
  const requestPasswordResetService = await requestPasswordReset(
    req.body.email
  );
  return res.json(requestPasswordResetService);
});

router.post("/reset-password", async (req, res) => {
  const passwordResetService = await resetPassword(req.body);
  return res.json(passwordResetService);
});

module.exports = router;
