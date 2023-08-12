const router = require('express').Router();
const authController = require('../controllers/controller.auth');

const validate = require('../middlewares/middlware.validate');
const loginSchema = require('../requests/request.login');
const registerSchema = require('../requests/request.register');

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh-token', authController.refreshToken);

module.exports = router;