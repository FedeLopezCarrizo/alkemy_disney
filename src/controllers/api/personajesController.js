const { Personaje } = require('../../database/models');

const controller = {
	all: async (req, res) => {
		try {
			const personajes = await Personaje.findAll();
            let cantidadRegistros = Object.keys(personajes).length;
            let respuesta;

            if (cantidadRegistros > 0){
                for (let i = 0; i < cantidadRegistros; i++){
                    personajes[i].setDataValue("endpoint", "/api/personajes/" + personajes[i].id)
                }
                
                respuesta = {
                    metadata:{
                        status:200,
                        cantidad:cantidadRegistros
                    },
                    resultados:personajes
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
			const personajeToView = await Personaje.findByPk(req.params.idPersonaje);
            let respuesta;
			
            if (personajeToView != null){
                respuesta = {
                    metadata:{
                        status:200,
                    },
                    resultados:personajeToView
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
	}
};

module.exports = controller;