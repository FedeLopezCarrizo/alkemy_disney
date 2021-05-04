module.exports = (sequelize, DataTypes) => {
    const Personaje = sequelize.define("Personaje", {
        nombre: DataTypes.STRING,
        edad: DataTypes.INTEGER,
        peso: DataTypes.FLOAT,
        historia: DataTypes.STRING,
        imagen: DataTypes.STRING
    });
    Personaje.associate = (models => {
        Personaje.belongsToMany(models.Pelicula, {
            as: 'peliculas',
            through: 'peliculapersonaje'
        });
    });

    return Personaje;
}