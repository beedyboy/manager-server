const { Router } = require('express');
const company = require('../controllers/companyController');
const router = Router();

router.get('/', company.getCompany);

// router.post('/createUser', company.createUser);

// router.post('/delete', company.deleteUser);

// router.post('/update/:id', company.updateUser);

module.exports = router;