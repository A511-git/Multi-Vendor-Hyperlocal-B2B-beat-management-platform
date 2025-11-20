import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE_NAME,
    process.env.MYSQL_USER_NAME,
    process.env.MYSQL_DATABASE_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        port: 3307,
        dialect: 'mysql'
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}