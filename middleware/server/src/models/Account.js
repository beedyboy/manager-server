'use strict';
    
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstname} ${this.lastname}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    },
    address: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    signature: DataTypes.STRING,
    emergency_contact: DataTypes.STRING,
    emergency_phone: DataTypes.STRING,
    acl: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('acl'));
      },
      set(value) {
        this.setDataValue('acl', JSON.stringify(value));
      }
    }, 
    can_login: {
      type: DataTypes.ENUM('Yes', 'No'),
      defaultValue: 'No'
    },
    signed: {
      type: DataTypes.ENUM('Yes', 'No'),
      defaultValue: 'No'
    },
    onboarded: {
      type: DataTypes.ENUM('Yes', 'No'),
      defaultValue: 'No'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    pre_contract: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('pre_contract'));
      },
      set(value) {
        this.setDataValue('pre_contract', JSON.stringify(value));
      }
    }, 
    general: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('general'));
      },
      set(value) {
        this.setDataValue('general', JSON.stringify(value));
      }
    }, 
    student: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('student'));
      },
      set(value) {
        this.setDataValue('student', JSON.stringify(value));
      }
    }, 
    para_professional: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('para_professional'));
      },
      set(value) {
        this.setDataValue('para_professional', JSON.stringify(value));
      }
    }, 
    professional: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('professional'));
      },
      set(value) {
        this.setDataValue('professional', JSON.stringify(value));
      }
    }, 
    marketing: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('marketing'));
      },
      set(value) {
        this.setDataValue('marketing', JSON.stringify(value));
      }
    }, 
    management_executive: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('management_executive'));
      },
      set(value) {
        this.setDataValue('management_executive', JSON.stringify(value));
      }
    }, 
    post_contract: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('post_contract'));
      },
      set(value) {
        this.setDataValue('post_contract', JSON.stringify(value));
      }
    }, 
    sec_question_one:  DataTypes.STRING,
    sec_answer_one:  DataTypes.STRING,
    sec_question_two:  DataTypes.STRING,
    sec_answer_two:  DataTypes.STRING, 
    staffId:  DataTypes.STRING, 
    status: {
      type: DataTypes.ENUM('Pending', 'Active', 'Deleted'),
      defaultValue: 'Active',
      allowNull: false,
    },
  }, {
    paranoid: true
  });

  Account.associate = (models) => {
    models.Account.hasMany(models.Branch, {
      foreignKey: {
        name: 'branch_id'
      }
    });
    models.Account.hasMany(models.Address, {
      foreignKey: {
        name: 'customerId'
      }
    });
    models.Account.hasMany(models.Cart, {
      foreignKey: {
        name: 'customerId'
      }
    });

  };

  return Account;
};