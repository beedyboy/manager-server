const express = require('express'); 
const routes = express.Router();
const dashboard = require('./dashboard');
const auth = require('./auth');
const department = require('./department');
const category = require('./category');
const subcategory = require('./subcategory');
const company = require('./company');
const branch = require('./branch');
const user = require('./user');
const asset = require('./asset');
const allocation = require('./allocation');
const product = require('./product');
const stock = require('./stock');
const order = require('./order');
const sale = require('./sale');
const ticket = require('./ticket');
const conversation = require('./conversation');



routes.use("/dashboard", dashboard);
routes.use("/auth", auth);
routes.use("/department", department);
routes.use("/category", category);
routes.use("/subcategory", subcategory);
routes.use("/company", company);
routes.use("/branch", branch);
routes.use("/user", user);
routes.use("/asset", asset);
routes.use("/allocation", allocation);
routes.use("/product", product);
routes.use("/stock", stock); 
routes.use("/order", order);
routes.use("/sale", sale);
routes.use("/ticket", ticket);
routes.use("/conversation", conversation);

module.exports = routes;
 
