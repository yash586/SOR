const { DataTypes, Model } = require("sequelize");
const uniqid = require("uniqid");
const { sequelize } = require("../config/database");

class Employee extends Model {}

Employee.init(
  {
    employeeid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    ID: {
      type: DataTypes.STRING(18),
      allowNull: false,
      defaultValue: () => uniqid(),
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "employee",
    timestamps: true,
  },
);

module.exports = Employee;
