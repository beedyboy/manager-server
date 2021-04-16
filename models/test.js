const express = require("express");
const db = require("../config/knex");
const helper = require("../lib/helper");
const router = express.Router();  
 

router.get("/", (req, res) => {
  try {
    
    // res.writeHead(200, { "Content-Type": "text/plain" });
    var message = "Test routes works ooo!\n",
    db = "database " + process.env.MANAGER_DB_DATABASE + "\n", 
      Host = "DB_ENV " + process.env.DB_ENV + "\n", 
      response = [message, db, Host].join("\n");
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
}) 

router.get("/branch", (req, res) => {
    const result = db("branches")
      .select()
      .then((data) => {
        res.send(data).status(200);
      });
  });
 
 
module.exports = router;
