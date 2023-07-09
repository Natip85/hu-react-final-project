var express = require('express');
var router = express.Router();
const cards = require('../controllers/cards');
const auth = require('../middleware/auth')
const multer = require('multer')

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
router.get('/favs', auth, cards.getUserFavoriteCards);
router.get('/mycards/:_id', cards.myCards);
router.get('/', cards.allCards);
router.get('/:id', cards.getOneCard);

router.post('/', auth, upload.single('image'), cards.addCard);
router.post('/:id',auth, cards.setFavorite);

router.patch('/:id',  cards.edit);

router.delete('/:id', cards.delete);

module.exports = router;