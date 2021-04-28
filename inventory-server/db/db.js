const knex = require('knex');
const knexfile = require('./knexfile');

//TODO in prod, use dependency injection
// to creatr knex instance so db access can be mocked
// for tests

//TODO
const db = knex(knexfile.development);
module.exports = db;