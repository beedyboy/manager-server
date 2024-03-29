// Update with your config settings.

module.exports = { 
  development: {
   client: 'pg',
   connection: {     
     host: '127.0.0.1',
     user: 'postgres',
     password: '1234',
     database: 'manager',
     charset: 'utf8'
   },
  migrations: {
     directory: './database/migrations'
   },
   seeds: {
     directory: './database/seeds'      
   }
 },

 staging: {
   client: 'pg',
   connection: {
     database: 'manager',
     user:     'postgres',
     password: 'dontopen'
   },
   pool: {
     min: 2,
     max: 10
   },
   migrations: {
     tableName: 'knex_migrations'
   }
 },
 production: {
   client: 'pg',
  //  connection: 'postgres://youarec1_root:ManagerPG21@youarecaptured.com:5432/youarec1_manager'
   connection: {     
     host: '52.49.171.158',
     user: 'youarec1_root',
     port: Number(process.env.MANAGER_DB_PORT),
     password: 'C1Manager21#',
     database: 'youarec1_manager',
     charset: 'utf8',
     ssl: { rejectUnauthorized: false }
   },
 },
production2: {
   client: 'pg',
   connection: {     
     host: 'ec2-54-247-158-179.eu-west-1.compute.amazonaws.com',
     user: 'sikaktfchrwgxt',
     port: 5432,
     password: '48f4642db8f7473f34c672d2f87b6116f2200e1fb116b12179c165c08f997b86',
     database: 'dc3ikd68gimvte',
     charset: 'utf8',
     ssl: { rejectUnauthorized: false }
   },
   pool: {
     min: 2,
     max: 10
   },
   migrations: {
     directory: './database/migrations'
   },
   seeds: {
     directory: './database/seeds'      
   }
 },
production1: {
   client: 'pg',
   connection: process.env.DATABASE_URL,
   ssl: true,
   pool: {
     min: 2,
     max: 10
   },
   migrations: {
     directory: './database/migrations'
   },
   seeds: {
     directory: './database/seeds'      
   }
 }

};
 