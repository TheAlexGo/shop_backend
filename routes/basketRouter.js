const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController');
const authMiddleware = require('../middleware/authMiddleware');
const checkFields = require('../middleware/checkField/checkFieldsBasketMiddleware');

router.post('/', authMiddleware, checkFields, basketController.addItem);
router.delete('/', authMiddleware, checkFields, basketController.removeItem);
router.get('/', authMiddleware, basketController.get);

module.exports = router;
