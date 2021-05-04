const express = require('express');
const router = express.Router();

const apiPersonajesController = require('../../controllers/api/personajesController');

router.get('/', apiPersonajesController.all);
router.get('/:idPersonaje', apiPersonajesController.detail);


module.exports = router;