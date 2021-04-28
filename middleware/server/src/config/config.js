require("dotenv")
module.exports = {
    development: { 
      database: process.env.MANAGER_DB_DATABASE,
      username: process.env.MANAGER_DB_USERNAME,
      password: process.env.MANAGER_DB_PASSWORD,
      host: process.env.MANAGER_DB_HOST,
      port: process.env.MANAGER_DB_PORT,
      dialect: 'postgres', 
    },
    production: { 
          database: process.env.MANAGER_DB_DATABASE,
          username: process.env.MANAGER_DB_USERNAME,
          password: process.env.MANAGER_DB_PASSWORD,
          host: process.env.MANAGER_DB_HOST,
          port: process.env.MANAGER_DB_PORT,
          dialect: 'postgres', 
    },
  };