const { validationResult } = require("express-validator");

const { Personaje, Pelicula } = require('../database/models');
const db = require('../database/models');

const controller = {
	all: async (req, res) => {
		try {
			const personajes = await Personaje.findAll();
			res.render('personajes/personajes', { personajes });
		} catch (error) {
			console.log(error);
		}
	},	
	detail: async (req, res) => {
		try {		
			
            const personajeToView = await Personaje.findByPk(req.params.idPersonaje);
			
			res.render('personajes/personajeDetail', { personajeToView: personajeToView });
		} catch (error) {
			console.log(error);
		}
	},
	create: async (req, res) => {
		try {
			const peliculas = await Pelicula.findAll();
			res.render('personajes/personajeCreate', { peliculas });
		} catch (error) {
			console.log(error);
		}
	}, 
	createPersonaje: async (req, res, next) => {		
		try {
			let errors = validationResult(req);
	
			if (errors.isEmpty()){
				let newPersonajeBody = {
					...req.body, 
					imagen: req.files[0].filename
				}
				
				const newPersonaje = await Personaje.create(newPersonajeBody);
				await newPersonaje.addPeliculas(req.body.pelicula);
				res.redirect('/personajes');
			} else {
				const peliculas = await Pelicula.findAll();
				return res.render('personajes/personajeCreate', { peliculas, errors: errors.errors, old: req.body });
			}
            
        } catch (error) {
            console.log(error);
        }
	}, 
    search: async (req, res, next) => {
        try {
            const personajesSearch = await Personaje.findAll({
				where: {
					nombre: {[db.Sequelize.Op.like] : '%' + req.body.keywords + '%'}
				},
				order: [
					[req.body.order, req.body.desc_asc]
				]
			});
		
        	res.render('personajes/personajeSearch', { personajesSearch });
        } catch (error) {
            console.log(error);
        }
    }, 
	edit: async (req, res) => {
		try {
			const idPersonaje = req.params.idPersonaje;
	
            const personajeToEdit = await Personaje.findByPk(idPersonaje, { include: ['peliculas']});
			const peliculas = await Pelicula.findAll();
			
            res.render('personajes/personajeEdit', { personajeToEdit, peliculas });
			
		} catch (error) {
            console.log(error);
		}
	}, 
	update: async (req, res, next) => {
		try {		
			const personajeId = req.params.idPersonaje;
			let updatePersonajeBody = {
				...req.body, 
				imagen: req.files[0].filename
			}
            const updatePersonaje = await Personaje.findByPk(personajeId, { include:['peliculas'] });
            
            await updatePersonaje.removePeliculas(updatePersonaje.peliculas);
            await updatePersonaje.addPeliculas(req.body.pelicula);
            await updatePersonaje.update(updatePersonajeBody);

			res.redirect('/personajes/' + personajeId);
		} catch (error) {
            console.log(error);
		}
	}, 
	delete: async (req, res, next) => {	
		try {
			let idPersonaje = req.params.idPersonaje;
			const personajeToDelete = await Personaje.findByPk(idPersonaje, { include: ['peliculas']});
			const peliculas = await Pelicula.findAll();
	
			res.render('personajes/personajeDelete', { personajeToDelete, peliculas });
		} catch (error) {
            console.log(error);
		}
	},
	deletePersonaje: async (req, res, next) => {	
		try {

			const personajeId = req.params.idPersonaje; 
            const deletePersonaje = await Personaje.findByPk(personajeId,{include: ['peliculas'] });
            await deletePersonaje.removePeliculas(deletePersonaje.peliculas);
            deletePersonaje.destroy({
                where: {
                    id: personajeId
                }
            }); 
			res.redirect('/personajes');
		} catch (error) {
            console.log(error);
		}
	}
};

module.exports = controller;