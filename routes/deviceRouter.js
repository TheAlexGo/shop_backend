const Router = require('express');
const router = new Router();
const deviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');
const checkFieldsMiddleware = require('../middleware/checkField/checkFieldsDeviceMiddleware');

router.post('/', checkRole('ADMIN'), checkFieldsMiddleware, deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);

module.exports = router;
