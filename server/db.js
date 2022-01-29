
const {sequalize, Sequelize} = require('sequelize');

module.exports = new Sequelize(
    process.env.DB_NAME, // Имя Бд
    process.env.DB_USER, // Имя пользователя
    process.env.DB_PASSWORD, // Пароль
    {
        dialect:'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
);