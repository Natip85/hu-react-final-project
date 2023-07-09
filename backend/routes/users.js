var express = require('express');
var router = express.Router();
const users = require('../controllers/users');
const multer = require('multer')
const auth = require('../middleware/auth')

// multer middleware
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename:  function (req, file, cb) {
    const submitDate = Date.now()
    cb(null,  submitDate+ '-'+file.originalname);
  },
});
const upload = multer({ storage: storage });


//routes
router.get('/myuser', auth, users.myUser);
router.get('/:id',auth, users.oneUser);
router.get('/', users.allUsers);

router.patch('/uploadAvatar', auth, upload.single('image'), users.uploadAvatar);
router.post('/signup', upload.single('image'), users.signup);
router.post('/login', users.login);
router.post('/resetPassword', users.resetPassword);

router.patch('/actualResetPassword/:id', users.actualResetPassword);
router.patch('/:id', users.edit);

router.delete('/:id', users.delete);


module.exports = router;
