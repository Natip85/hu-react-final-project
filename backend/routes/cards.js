var express = require('express');
var router = express.Router();
const cards = require('../controllers/cards');
const auth = require('../middleware/auth')

router.get('/favs', auth, cards.getUserFavoriteCards);
router.get('/mycards/:_id', cards.myCards);
router.get('/', cards.allCards);
router.get('/:id', cards.getOneCard);

router.post('/', cards.addCard);
router.post('/:id',auth, cards.setFavorite);

router.patch('/:id',  cards.edit);

router.delete('/:id', cards.delete);

module.exports = router;