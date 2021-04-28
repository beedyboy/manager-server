const branchService = require('../service/branch');

class BranchController {
   async  createBranch(req, res) {
 try {
     const id = await branchService.createBranch(req.body);
     res.status(201).json(id)
 } catch (error) {
     console.error(error);
     res.status(500).json('something went wrong')
 }
    }
}
module.exports = new BranchController();