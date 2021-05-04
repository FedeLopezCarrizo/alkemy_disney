const { validationResult } = require("express-validator");

const { Pelicula } = require('../../database/models');

const controller = {
	all: async (req, res) => {
		try {
			const peliculas = await Pelicula.findAll();
            let cantidadRegistros = Object.keys(peliculas).length;
            let respuesta;

            if (cantidadRegistros > 0){
                for (let i = 0; i < cantidadRegistros; i++){
                    peliculas[i].setDataValue("endpoint", "/api/peliculas/" + peliculas[i].id)
                }

                respuesta = {
                    metadata:{
                        status:200,
                        cantidad:cantidadRegistros
                    },
                    resultados:peliculas
                }
            }
            else{
                respuesta = {
                    metadata:{
                        status:204
                    },
                    resultados:'La cantidad de registros es cero!!!'
                }
            }
    
            res.json(respuesta);
		} catch (error) {
			console.log(error);
		}
	},	
	detail: async (req, res) => {
		try {		
			const peliculaToView = await Pelicula.findByPk(req.params.idPelicula);
            let respuesta;
			
            if (peliculaToView != null){
                respuesta = {
                    metadata:{
                        status:200,
                    },
                    resultados:peliculaToView
                }
            }
            else{
                respuesta = {
                    metadata:{
                        status:204
                    },
                    resultados:'La cantidad de registros es cero!!!'
                }
            }
    
            res.json(respuesta);
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
					generoId: req.body.genero
				}
				
				await Pelicula.create(newPeliculaBody);
				res.json(newPeliculaBody);
			} 
            
        } catch (error) {
            console.log(error);
        }
	}
};

module.exports = controller;