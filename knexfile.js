// Update with your config settings.

module.exports = { 
   development: {
    client: 'pg',
    connection: {     
      host: '127.0.0.1',
      user: 'postgres',
      password: 'dontopen',
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
    connection: process.env.DATABASE_URL,
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
