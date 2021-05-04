const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validator = require('../middlewares/rutas/validator');

const peliculasController = require('../controllers/peliculasController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

router.get('/', peliculasController.all); 

router.get('/create', peliculasController.create)
router.post('/create', upload.any(), validator.pelicula, peliculasController.createPelicula);

router.get('/edit/:idPelicula', peliculasController.edit);
router.put('/edit/:idPelicula', upload.any(), validator.pelicula, peliculasController.update);

router.get('/delete/:idPelicula', peliculasController.delete);
router.delete('/delete/:idPelicula', peliculasController.deletePelicula);

router.get('/:idPelicula', peliculasController.detail);

router.post('/search', peliculasController.search);

module.exports = router;