const { Router } = require('express');

const router = Router();

//Middlewares
// const auth = require('../middlewares/auth');

//Upload helper
// const uploadToCloud = require('../utils/uploadMedia');

//Upload Route
// router.post('/upload', async (req, res) => {
//     uploadToCloud.uploadMediaToCloud(req)
//         .then(result => result.status ? res.status(200).send(result) : res.status(400).send(result))
//         .catch(error => {
//             console.log(error);
//             return res.status(500).send({
//                 status: false,
//                 message:'Something went wrong'
//             })
//         })
// });

//Application Routes
// router.use('/', require('./auth'));
// router.use('/admins', auth.check_loggedIn_user, auth.check_admin_status, require('./admin'));
// router.use('/users', auth.check_loggedIn_user, require('./user'));
router.use('/company', require('./company'));

//Base Route
router.get('/', (req, res) => res.sendStatus(200));

//Page Not Found
router.all('*', (req, res) => res.sendStatus(404));

module.exports = router;