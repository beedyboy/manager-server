const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const http = require('http'); 
const path = require('path'); 
const db = require('./config/knex'); 
const fs = require('fs'); 
const cors = require("cors"); 
var routes = require('./models/index'); 
// var sms = require('./plugins/sms');
const app = express();
const origin = 'https://office-manager-client.herokuapp.com';
// const origin = '*';
app.use(cors({
  'allowedHeaders': ["Origin"," X-Requested-With", "Content-Type", "Accept", 'Authorization', "X-Access-Token"],
  'exposedHeaders': ['sessionId'], 
  'origin': origin,
  'methods': 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE', 
  'preflightContinue': false,
  "optionsSuccessStatus": 200
}));
   

app.use(express.static('views/'));
app.use('/uploads/products', express.static('uploads/products'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser()); 
 const server = http.createServer(app);
app.use('/api', routes); 
app.get('/', (req,res) => { 
	 console.log('Cookies: ', req.cookies)
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
 res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'It works ooo!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        response = [message, version].join('\n');
    res.end(response);
})
 
// Define PORT
const port = process.env.PORT || 8000;
 server.listen(port, () => {
    console.log('Connected to port ' + port); 
})
// const io = socketio(server);

 