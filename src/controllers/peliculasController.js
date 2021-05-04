const { validationResult } = require("express-validator");

const { Personaje, Pelicula, Genero } = require('../database/models');
const db = require('../database/models');
const moment = require('moment');

const controller = {
	all: async (req, res) => {
		try {
			const peliculas = await Pelicula.findAll();
			res.render('peliculas/peliculas', { peliculas });
		} catch (error) {
			console.log(error);
		}
	},	
	detail: async (req, res) => {
		try {		
			
            const peliculaToView = await Pelicula.findByPk(req.params.idPelicula);
			
			res.render('peliculas/peliculaDetail', { peliculaToView: peliculaToView, moment: moment });
		} catch (error) {
			console.log(error);
		}
	},
	create: async (req, res) => {
		try {
			const generos = await Genero.findAll();
			res.render('peliculas/peliculaCreate', { generos });
		} catch (error) {
			console.log(error);
		}
	}, 
	createPelicula: async (req, res, next) => {		
		try {
			let errors = validationResult(req);
	
			if (errors.isEmpty()){
				let newPeliculaBody = {
					...req.body, 
					imagen: req.files[0].filename,
					generoId: req.body.genero
				}
				
				await Pelicula.create(newPeliculaBody);
				res.redirect('/peliculas');
			} else {
				const generos = await Genero.findAll();
				return res.render('peliculas/peliculaCreate', { generos: generos, errors: errors.errors, old: req.body });
			}
            
        } catch (error) {
            console.log(error);
        }
	}, 
    search: async (req, res, next) => {
        try {
            const peliculasSearch = await Pelicula.findAll({
				where: {
					titulo: {[db.Sequelize.Op.like] : '%' + req.body.keywords + '%'}
				},
				order: [
					[req.body.order, req.body.desc_asc]
				]
			});
			
        	res.render('peliculas/peliculaSearch', { peliculasSearch });
        } catch (error) {
            console.log(error);
        }
    }, 
	edit: async (req, res) => {
		try {
			const idPelicula = req.params.idPelicula;
	
            const peliculaToEdit = await Pelicula.findByPk(idPelicula, { include: ['Genero']});
			const generos = await Genero.findAll();
			
            res.render('peliculas/peliculaEdit', { peliculaToEdit, generos, moment: moment });
			
		} catch (error) {
            console.log(error);
		}
	}, 
	update: async (req, res, next) => {
		try {		
			const peliculaId = req.params.idPelicula;
			let updatePeliculaBody = {
				...req.body, 
				imagen: req.files[0].filename,
                generoId: req.body.genero
			}
            const updatePelicula = await Pelicula.findByPk(peliculaId, { include:['Genero'] });
            
            await updatePelicula.update(updatePeliculaBody);

			res.redirect('/peliculas/' + peliculaId);
		} catch (error) {
            console.log(error);
		}
	}, 
	delete: async (req, res, next) => {	
		try {
			let idPelicula = req.params.idPelicula;
			const peliculaToDelete = await Pelicula.findByPk(idPelicula, { include: ['personajes']});
			const personajes = await Personaje.findAll();
	
			res.render('peliculas/peliculaDelete', { peliculaToDelete, personajes });
		} catch (error) {
            console.log(error);
		}
	},
	deletePelicula: async (req, res, next) => {	
		try {
			const peliculaId = req.params.idPelicula; 
            const deletePelicula = await Pelicula.findByPk(peliculaId,{include: ['personajes'] });
            await deletePelicula.removePersonajes(deletePelicula.personajes);
            deletePelicula.destroy({
                where: {
                    id: peliculaId
                }
            }); 
			res.redirect('/peliculas');
		} catch (error) {
            console.log(error);
		}
	}
};

module.exports = controller;