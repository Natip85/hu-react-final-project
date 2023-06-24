var express = require('express');
var router = express.Router();
const events = require('../controllers/events');

router.get('/', events.getAll);
router.get('/:title', events.getItem);
router.post('/', events.add);
router.delete('/:id', events.delete);

module.exports = router;