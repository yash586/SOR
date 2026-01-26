const { Sequelize } = require("sequelize");

const host = process.env.DB_HOST ?? "localhost";
const username = process.env.DB_USER ?? "root";
const password = process.env.DB_PASSWORD ?? "";
const database = process.env.DB_NAME ?? "test";
const port = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;

const sequelize = new Sequelize({
  dialect: "mysql",
  host,
  username,
  password,
  database,
  port,
  logging: false,
});
module.exports = { sequelize };
