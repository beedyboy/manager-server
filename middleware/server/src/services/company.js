const DB = require('../models'); 

const companyServices = {};

 
companyServices.getCompany = async (id) => {

    let category_record =  await DB.Company.findOne({ where: { id } });
    if (!category_record) return {
        status: false,
        message: 'Invalid ID details'
    }

    return {
        status: true,
        message: 'Company Record details',
        data: category_record
    }
};
 

module.exports = companyServices;