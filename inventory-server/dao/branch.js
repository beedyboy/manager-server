const db = require('../db/db');
class BranchDAO {
   async createBranch(name, address, email, phone) {
    const [id] =  await db('branches').insert({
            name, address, email, phone
        })
        .returning('id')

        return id;
    }
}
module.exports = new BranchDAO();