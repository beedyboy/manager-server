require("express-async-errors");
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http"); 
const logger = require('morgan');
// const db = require("./config/knex");
const fs = require("fs");
const cors = require("cors"); 
const app = express(); 
// Define PORT
const port = process.env.PORT || 8082;
// const origin = "https://office-manager-client.herokuapp.com";
// const origin = "https://www.youarecaptured.com";

const log = require('./utils/logger');


log.info('Starting Wig Tools API server...');

const origin = '*';
app.use(
  cors({
    allowedHeaders: [
      "Origin",
      " X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
      "X-Access-Token",
    ],
    exposedHeaders: ["sessionId"],
    origin: origin,
    methods: "OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 200,
  })
);
// Log requests to the console.
app.use(logger('dev'));



// Parse incoming requests data 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

log.done('Application middlewares connected');

//Application Routes
app.use(require('./models/index'));

log.done('Application Routes connected');
app.listen(port, () => { log.done(`Listening on PORT: ${port}`); });
// app.use(express.static("views/"));
// app.use("/uploads/products", express.static("uploads/products"));
// // app.use(bodyParser.urlencoded({ extended: true }));
// // app.use(bodyParser.json());
// app.use(cookieParser());
// app.use((error, req, res, next) => {
//   res.status(500).json({ error: error.message });
// });
// const server = http.createServer(app);
// app.use("/api", routes);
app.get("/", (req, res) => {
  console.log("Cookies: ", req.cookies);
  // Cookies that have been signed
  console.log("Signed Cookies: ", req.signedCookies);
  res.writeHead(200, { "Content-Type": "text/plain" });
  var message = "Beedy It works ooo!\n",
    version = "NodeJS " + process.versions.node + "\n", 
    response = [message, version].join("\n");
  res.end(response);
});

// server.listen(port, () => {
//   console.log("Connected to port " + port);
// });
// const io = socketio(server);
