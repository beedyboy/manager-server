'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const Company = sequelize.define('Company', {
    companyname: DataTypes.STRING,
    address: DataTypes.TEXT, 
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone: DataTypes.STRING,
    appname: DataTypes.STRING,
    logo: DataTypes.STRING,
    created_at: DataTypes.STRING,
    updated_at: DataTypes.STRING
  }); 
  Company.sync();
  return Company;
};
 