const { body } = require("express-validator");

module.exports = {
    login: [
        body('email')
            .notEmpty()
            .withMessage("El campo email es obligatorio")
            .isEmail()
            .withMessage("El campo email no corresponde a un email válido")
            .isLength({ max: 256 })
            .withMessage("El campo email tiene un máximo de 256 caracteres"),
        body('password')
            .notEmpty()
            .withMessage("El campo password es obligatorio")
    ],
    register: [
        body('email')
            .notEmpty()
            .withMessage("El campo email es obligatorio")
            .isEmail()
            .withMessage("El campo email no corresponde a un email válido")
            .isLength({ max: 256 })
            .withMessage("El campo email tiene un máximo de 256 caracteres"),
        body('password')
            .notEmpty()
            .withMessage("El campo password es obligatorio")
    ],
    personaje: [
        body("nombre")
            .notEmpty()
            .withMessage("El campo de nombre es obligatorio")
            .isLength({ max: 256 })
            .withMessage("El campo nombre tiene un máximo de 256 caracteres"),
        body("edad")
            .isInt()
            .withMessage("El campo edad debe ser un número entero"),
        body("peso")
            .isFloat()
            .withMessage("El campo peso debe ser un número")
    ],
    pelicula: [
        body("titulo")
            .notEmpty()
            .withMessage("El campo de titulo es obligatorio")
            .isLength({ max: 500 })
            .withMessage("El campo nombre tiene un máximo de 500 caracteres")
            .withMessage("El campo peso debe ser un número")
    ]
}