const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const router = express.Router(); 
const { validate, checkHeader } = require("../middleware/valid");

router.get("/:email/exist", (req, res) => {
  try {
    const email = req.params.email;
    db("staffs")
      .where({ email })
      .select("email")
      .then((data) => {
        if (data.length > 0) {
          res.send({ exist: true });
        } else {
          res.send({ exist: false });
        }
      });
  } catch (err) {
    console.log(err);
  }
});
//register user
router.post("/",   validate("staffs"), (req, res) => {
  try {
    const {
      email,
      firstname,
      lastname,
      phone: phone_number,
      acl,
      staffId,
      branch_id,
    } = req.body;
    const created_at = new Date().toLocaleString();
    db("staffs")
      .returning("id")
      .insert({
        email,
        firstname,
        lastname,
        phone_number,
        acl,
        staffId,
        branch_id,
        created_at,
      })
      .then((result) => {
        if (result.length > 0) {
          res.send({ status: 200, message: "Account created successfully" });
        } else {
          res.send({ status: 404, message: "Account was not created" });
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

router.post("/create/login", validate("logins"), (req, res) => {
  try {
    const { email, id: staff_id } = req.body;
    const password = helper.hash(req.body.password);
    db("staffs").returning("id");
    db("logins")
      .insert({ staff_id, email, password })
      .then((reply) => {
        if (reply) {
          db("staffs")
            .where("id", staff_id)
            .update("can_login", "Yes")
            .then((data) => {
              if (data) {
                res.send({
                  status: 200,
                  message: "Login account created successfully",
                });
              }
            });
        } else {
          res.send({ status: 404, message: "Account not created" });
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

router.get("/", (req, res) => {
  const result = db("staffs")
    .select()
    .then((data) => {
      res.send(data).status(200);
    });
});

router.get("/get/profile", checkHeader, (req, res) => {
  const id = req.user.id;
  db("staffs as s")
    .where("s.id", id)
    .join("branches as b", "s.branch_id", "=", "b.id")
    .first("s.*", "b.name as branchName")
    .then((data) => {
      if (data) {
        res.send({
          status: 200,
          data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/profile/:id", checkHeader, (req, res) => {
  const id = parseFloat(req.params.id);
  db("staffs as s")
    .where("s.id", id)
    .join("branches as b", "s.branch_id", "=", "b.id")
    .first("s.*", "b.name as branchName")
    .then((data) => {
      if (data) {
        res.send({
          status: 200,
          data,
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/update/profile", checkHeader, (req, res) => {
  try {
    const id = req.user.id;
    const {
      firstname,
      lastname,
      phone_number,
      address,
      emergency_contact,
      emergency_phone,
    } = req.body;
    const updated_at = new Date().toLocaleString();
    db("staffs")
      .where("id", id)
      .update({
        firstname,
        lastname,
        phone_number,
        address,
        emergency_contact,
        emergency_phone,
        updated_at,
      })
      .then((data) => {
        if (data) {
          res.send({
            status: 200,
            message: "Profile updated successfully",
          });
        } else {
          res.send({
            status: 400,
            message: "Error updating profile",
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

//update staff
router.post("/update", checkHeader, (req, res) => {
  try { 
    const {
      id,
      email,
      firstname,
      lastname,
      phone: phone_number,
      address,
      staffId,
      emergency_contact,
      emergency_phone,
      acl,
      branch_id,
    } = req.body;
    const updated_at = new Date().toLocaleString();
    db("staffs")
      .where("id", id)
      .update({
        email,
        firstname,
        lastname,
        phone_number,
        address,
        staffId,
        emergency_contact,
        emergency_phone,
        acl,
        branch_id,
        updated_at,
      })
      .then((data) => {
        if (data) {
          res.send({
            status: 200,
            message: "Account updated successfully",
          });
        } else {
          res.send({
            status: 400,
            message: "Error updating info",
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
//update staff
router.post("/acl", checkHeader, (req, res) => {
  try {
    const { priviledges, id } = req.body;
    const acl = JSON.stringify(req.body.priviledges);
    const updated_at = new Date().toLocaleString();
    db("staffs")
      .where("id", id)
      .update({ acl, updated_at })
      .then((data) => {
        if (data) {
          res.send({
            status: 200,
            message: "Access Level has been set successfully",
          });
        } else {
          res.send({
            status: 400,
            message: "Error setting access level",
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




//update staff
router.post("/update/signature", checkHeader, (req, res) => {
  try { 
    const {
      id,
      signature, 
    } = req.body;
    const signed = "Yes"
    const updated_at = new Date().toLocaleString();
    db("staffs")
      .where("id", id)
      .update({
        signature,
        signed,  
        updated_at,
      })
      .then((data) => {
        if (data) {
          res.send({
            status: 200,
            message: "Account updated successfully",
          });
        } else {
          res.send({
            status: 400,
            message: "Error updating info",
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
    db("staffs")
      .where("id", req.params.id)
      .del()
      .then((result) => {
        res.send({
          status: 200,
          message: "Account deleted successfully",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
    res.send({
      status: 400,
      message: error,
    });
  }
});

router.get("/login", (req, res) => {
  const result = db("logins")
    .select()
    .then((data) => {
      res.send(data).status(200);
    });
});

router.delete("/:email/login", (req, res) => {
  try {
    db("logins")
      .where("email", req.params.email)
      .del()
      .then((result) => {
        if (result) {
          res.send({
            status: 200,
            message: "Login account deleted successfully",
          });
        } else {
          res.send({
            status: 400,
            message: "Account not deleted",
          });
        }
      })
      .catch((err) => {
        console.log(err);
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
