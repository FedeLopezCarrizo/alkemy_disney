module.exports = (sequelize, DataTypes) => {
    const Pelicula = sequelize.define("Pelicula", {
        titulo: DataTypes.STRING,
        fechaCreacion: DataTypes.DATE,
        calificacion: DataTypes.INTEGER,
        imagen: DataTypes.TEXT,
        generoId: DataTypes.INTEGER
    });
    Pelicula.associate = (models => {
        Pelicula.belongsTo(models.Genero, {
            foreingKey: 'generoId'
        });
        Pelicula.belongsToMany(models.Personaje, {
            as: 'personajes',
            through: 'peliculapersonaje'
        });
    });

    return Pelicula;
}