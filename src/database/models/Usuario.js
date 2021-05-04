module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        email: DataTypes.STRING,
        password: DataTypes.TEXT
    });

    return Usuario;
}