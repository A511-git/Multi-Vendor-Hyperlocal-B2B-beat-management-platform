import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    process.env.DB_NAME,        // db name
    process.env.DB_USER,        // db user
    process.env.DB_PASSWORD,    // db password
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false,
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL connected successfully.");
    } catch (error) {
        console.error("MySQL connection failed:", error);
    }
};
