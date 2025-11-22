import mysql from "mysql2/promise";

async function deleteDatabase(dbConfig) {
  // dbConfig: { host, port, user, password, dbName }
  const { host, port, user, password, dbName } = dbConfig;
  const connection = await mysql.createConnection({ host, port, user, password });
  await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
  await connection.end();
  console.log(`Database ${dbName} deleted (if it existed).`);
}

// Example usage:
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
};

await deleteDatabase(dbConfig);
