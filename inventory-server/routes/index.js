const express = require('express');
const branchController = require('../controller/branch')
const router = express.Router();

router.post('/branch', branchController.createBranch);

module.exports = router;