const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // подключаем middleware для проверки авторизации
const checkFields = require('../middleware/checkField/checkFieldsUserMiddleware');
const checkRole = require('../middleware/checkRoleMiddleware');


router.post('/registration', checkFields('REGISTER'), userController.registration);
router.post('/login', checkFields('LOGIN'), userController.login);
router.get('/auth', authMiddleware, userController.check);
router.delete('/delete', checkRole('ADMIN'), checkFields('DELETE'), userController.delete);

module.exports = router;