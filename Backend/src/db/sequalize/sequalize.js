import { Sequelize } from "sequelize";
const dbName = process.env.DB_NAME;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;


export const sequelize = new Sequelize(dbName, user, password, {
  host, port, dialect: "mysql", logging: false,
});



export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected successfully.");

    await sequelize.sync({ force: false });
    console.log("MySQL synced successfully.");

  } catch (error) {
    console.error("MySQL connection/sync failed:", error);
  }
};
