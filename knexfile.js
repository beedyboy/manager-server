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
 production: {
    client: 'postgresql',
    connection: {
      database: 'youarec1_manager',
      user:     'youarec1_root',
      password: 'C1Manager21#'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
 
 
    //  ssl: { rejectUnauthorized: false }