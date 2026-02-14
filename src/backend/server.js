const dotenv = require("dotenv");
dotenv.config();
const server = require("./app");
const { sequelize } = require("./config/database");
const { initModels } = require("./models/index");

const PORT = process.env.PORT || 5000;

initModels();

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySql Connected");
    await sequelize.sync();
    server.listen(PORT, () => {
      console.log(`Server running on Port: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("DB connection Failed", error);
  }
};

startServer();
