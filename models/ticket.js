const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const { useDate } = require("../lib/function");
const { checkHeader } = require("../middleware/valid");

const router = express.Router();

//get all tickets
router.get("/", (req, res) => {
  db("tickets as t")
    .join("staffs as s", "s.id", "=", "t.staff_id")
    .select("t.*", "s.firstname", "s.lastname")
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
//get all tickets
router.get("/myticket", checkHeader, (req, res) => {
  try {
    const staff_id = req.user.id;
    db("tickets as t")
      .where("t.staff_id", staff_id)
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
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 500,
      message: "Something went wrong with your request",
    });
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  db("tickets as t")
	.where('t.id', id)
	.leftJoin('staffs as s', 't.assigned_to',   's.id' )
    .select('t.*', 's.firstname', 's.lastname')
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

//create a new ticket
router.post("/", checkHeader, (req, res) => {
  try {
    const {
      name: title,
      description,
      email,
      requester,
      category,
      priority,
      user,
    } = req.body;
    const created_at = new Date().toLocaleString();
    const ticket_date = useDate();
    if (user === "Admin") {
      const { staff_id } = req.body;
      db("tickets")
        .insert({
          title,
          description,
          email,
          staff_id,
          ticket_date,
          requester,
          category,
          priority,
          created_at,
        })
        .then((result) => {
          if (result) {
            res.send({
              status: 200,
              message: "Ticket created successfully",
            });
          } else {
            res.send({
              status: 204,
              message: "Ticket was not created",
            });
          }
        });
    } else {
      const staff_id = req.user.id;
      db("tickets")
        .insert({
          title,
          description,
          email,
          staff_id,
          ticket_date,
          requester,
          category,
          priority,
          created_at,
        })
        .then((result) => {
          if (result) {
            res.send({
              status: 200,
              message: "Ticket created successfully",
            });
          } else {
            res.send({
              status: 204,
              message: "Ticket was not created",
            });
          }
        });
    }
  } catch (err) {
    console.log({ err });
    res.status(500).json({
      message: "Something went wrong!!!",
    });
  }
});

//update ticket details
router.post("/update", (req, res) => {
  const {
    id,
    title,
    description,
    email,
    staff_id,
    ticket_date,
    requester,
    category,
    priority,
  } = req.body;
  const updated_at = new Date().toLocaleString();
  db("tickets")
    .where("id", id)
    .update({
      title,
      description,
      email,
      staff_id,
      ticket_date,
      requester,
      category,
      priority,
      updated_at,
    })
    .then((data) => {
      if (data) {
        res.send({
          status: 200,
          message: "Ticket updated successfully",
        });
      } else {
        res.send({
          status: 400,
          message: "Error updating ticket",
        });
      }
    });
});

//give a task to a manager
router.post("/assign", (req, res) => {
  let { ticket_id: id, assigned_to } = req.body;
  assigned_to = parseInt(assigned_to);
  id = parseInt(id);
  const updated_at = new Date().toLocaleString();
  db("tickets")
    .where("id", id)
    .update({ assigned_to, updated_at })
    .then((data) => {
      if (data) {
        res.send({
          status: 200,
          message: "Ticket updated successfully",
        });
      } else {
        res.send({
          status: 400,
          message: "Error updating ticket",
        });
      }
    });
});
//toggle status
router.post("/status", (req, res) => {
  const { id, status } = req.body;
  helper.updateStatus("tickets", id, status).then((data) => {
    if (data === true) {
      res.send({
        status: 200,
        message: "Ticket updated successfully",
      });
    } else {
      res.send({
        status: 400,
        message: "Error updating ticket",
      });
    }
  });
});
router.delete("/:id", (req, res) => {
  try {
    db("tickets")
      .where("id", req.params.id)
      .del()
      .then((result) => {
        res.send({
          status: 200,
          message: "Ticket deleted successgully",
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
