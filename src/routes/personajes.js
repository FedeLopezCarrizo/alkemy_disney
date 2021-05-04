const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validator = require('../middlewares/rutas/validator');

const personajesController = require('../controllers/personajesController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

router.get('/', personajesController.all); 

router.get('/create', personajesController.create)
router.post('/create', upload.any(), validator.personaje, personajesController.createPersonaje);

router.get('/edit/:idPersonaje', personajesController.edit);
router.put('/edit/:idPersonaje', upload.any(), validator.personaje, personajesController.update);

router.get('/delete/:idPersonaje', personajesController.delete);
router.delete('/delete/:idPersonaje', personajesController.deletePersonaje);

router.get('/:idPersonaje', personajesController.detail);

router.post('/search', personajesController.search);

module.exports = router;