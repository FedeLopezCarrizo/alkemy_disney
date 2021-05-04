module.exports = (sequelize, DataTypes) => {
    const Genero = sequelize.define("Genero", {
        nombre: DataTypes.STRING
    });
    Genero.associate = (models => {
        Genero.hasMany(models.Pelicula, {
            foreignKey: "generoId",
            as: "peliculas"
        });
    });

    return Genero;
}