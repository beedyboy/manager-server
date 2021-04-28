// require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

let db = {};
console.log({...config})
let sequelize = new Sequelize(
  config.database, config.username, config.password, { 
    ...config, 
    logging: false, 
    multipleStatements: true
  }
);

fs
  .readdirSync(__dirname)
  .filter(file =>
    (file.indexOf('.') !== 0) &&
    (file !== basename) &&
    (file.slice(-3) === '.js'))
  .forEach(file => {
    console.log('path ', path.join(__dirname, file))
    const model = require(`${path.join(__dirname, file)}`)(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
// const databases = Object.keys(config.databases);

// for (let i = 0; i < databases.length; i++) {
//   let database = databases[i];
//   let dbPath = config.databases[database];
//   db[database] = new Sequelize(
//     dbPath.database,
//     dbPath.username,
//     dbPath.password,
//     dbPath
//   );
// }

/**Add the Database Models**/
// fs.readdirSync(__dirname + '/rest')
//   .filter((file) => {
//     return (
//       file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
//     );
//   })
//   .forEach((file) => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
//     var model = db.rest.import(path.join(__dirname + '/rest', file));
//     db[model.name] = model;
//   });

// Object.keys(db).forEach((modelName) => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// module.exports = db;