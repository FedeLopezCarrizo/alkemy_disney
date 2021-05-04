const express = require('express');
const router = express.Router();
const validator = require('../middlewares/rutas/validator');

//requiero el controller
const usersController = require('../controllers/usersController');

router.get('/login', usersController.login);
router.post('/login', validator.login, usersController.processLogin);

router.get('/register', usersController.register);
router.post('/register', validator.register, usersController.create);

module.exports = router;
