const sequelize = require("../config/database");

const Employee = require("./employee.model");
const Records = require("./records.model");
const Category = require("./category.model");

const initModels = () => {
  //Associations go here
  Employee.hasMany(Records, { foreignKey: "employeeid" });
  Records.belongsTo(Employee, { foreignKey: "employeeid" });

  Category.hasMany(Records, { foreignKey: "categoryid" });
  Records.belongsTo(Category, { foreignKey: "categoryid" });
};

module.exports = {
  sequelize,
  initModels,
  Employee,
  Records,
  Category,
};
