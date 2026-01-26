const { DataTypes, Model } = require("sequelize");
const uniqid = require("uniqid");
const { sequelize } = require("../config/database");

class Records extends Model {}

Records.init(
  {
    recordid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    ID: {
      type: DataTypes.STRING(18),
      allowNull: false,
      defaultValue: () => uniqid(),
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employeeid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    active: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "sor_records",
    timestamps: true,
  },
);

module.exports = Records;
