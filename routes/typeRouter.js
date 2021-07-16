const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController');
const checkRole = require('../middleware/checkRoleMiddleware');
const checkField = require('../middleware/checkField/checkFieldsTypeBrandMiddleware');


router.post('/', checkRole('ADMIN'), checkField, typeController.create);
router.get('/', typeController.getAll);

module.exports = router;
