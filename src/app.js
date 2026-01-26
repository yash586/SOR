const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { sequelize } = require("./config/database");
const { initModels } = require("./models/index");

const app = express();
const PORT = process.env.PORT || 5000;

initModels();

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySql Connected");
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on Port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("DB connection Failed", error);
  }
};

startServer();
