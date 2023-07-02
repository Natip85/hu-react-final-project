var express = require('express');
var router = express.Router();
const users = require('../controllers/users');

router.get('/myuser/:id', users.myUser);
router.get('/', users.allUsers);


router.post('/signup', users.signup);
router.post('/login', users.login);
router.post('/resetPassword', users.resetPassword);
router.patch('/actualResetPassword/:id', users.actualResetPassword);

router.patch('/:id', users.edit);

router.delete('/:id', users.delete);


module.exports = router;
