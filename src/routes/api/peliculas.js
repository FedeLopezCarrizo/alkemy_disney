const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const apiPeliculasController = require('../../controllers/api/peliculasController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

router.get('/', apiPeliculasController.all);

router.post('/create', apiPeliculasController.createPelicula);

router.get('/:idPelicula', apiPeliculasController.detail);

router.post('/search', apiPeliculasController.search);

module.exports = router;