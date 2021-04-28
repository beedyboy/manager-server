const services = require('../services/company')

let companyController = {};

companyController.getCompany = async (req, res) => {
  try {
      return res.status(200).json({
          status: true,
          message: 'Account Record Details',
          data: req.user
      });

  } catch (error) {
      console.log(error);
      return res.status(500).json({
          status: false,
          message: "Something Went Wrong"
      })
  }
};

module.exports = companyController;