const { DataTypes, Model } = require("sequelize");
const uniqid = require("uniqid");
const { sequelize } = require("../config/database");

class Category extends Model {}

Category.init(
  {
    categoryid: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    ID: {
      type: DataTypes.STRING(18),
      allowNull: false,
      defaultValue: () => uniqid(),
    },

    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryBackGround: {
      type: DataTypes.STRING,
    },
    active: {
      type: DataTypes.TINYINT,
    },
  },
  {
    sequelize,
    tableName: "sor_category",
    timestamps: true,
  },
);

module.exports = Category;
