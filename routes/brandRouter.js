const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController');
const checkField = require('../middleware/checkField/checkFieldsTypeBrandMiddleware');

router.post('/', checkField, brandController.create);
router.get('/', brandController.getAll);

module.exports = router;
