const branchDAO = require('../dao/branch');
// do validation
class BranchService {
    createBranch(branchData) {
        const { name, address, email, phone } = branchData;
return branchDAO.createBranch(name, address, email, phone);
    }
}
module.exports = new BranchService();