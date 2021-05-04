const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
// traigo los modelos que voy a utilizar
const { Usuario } = require('../database/models');

function compararPass(password,hash) {
	return bcrypt.compareSync(password,hash);
}

const controller = {
    login: (req, res) => {
        res.render('users/login');
    },
    processLogin: async (req, res, next) => {
        try {
            let errors = validationResult(req);

            if (errors.isEmpty()){
                const userEncontrado = await Usuario.findAll({
                    where: {
                        email: req.body.email
                    }
                });

                let userPass = false;
                
                if (userEncontrado[0] != undefined){
                    userPass = compararPass(req.body.password, userEncontrado[0].password);
                }
                

                if (userPass){
                    req.session.usuario = userEncontrado[0].email;

                    if (req.body.recordame != undefined){
                        // acá creo la cookie
                        res.cookie("recordame", userEncontrado[0].email, { maxAge: 1000 * 60 * 60 * 24 } )
                    }

                    res.redirect('../index');
                }
                else{
                    const errorIngreso = [
                        {
                            "msg": "El usuario o password es incorrecto"
                        }
                    ];
					return res.render('users/login', { errors: errorIngreso, old: req.body });
                }
            } else {
				return res.render('users/login', { errors: errors.errors, old: req.body });
			}
        } catch (error) {
            
        }
    },
    register: (req, res) => {
        res.render('users/register');
    },
    create: async (req, res, next) => {
        try {
            let errors = validationResult(req);

            if (errors.isEmpty()){
                let passwordHash = bcrypt.hashSync(req.body.password, 10);
                let newUserBody = {
                    email: req.body.email,
                    password: passwordHash
                }

                const newUser = await Usuario.create(newUserBody);
                res.redirect('/users/login');
            } else {
                return res.render('users/register', { errors: errors.errors, old: req.body });
            }
        } catch (error) {
            console.log(error);
        }
    }
};

module.exports = controller;