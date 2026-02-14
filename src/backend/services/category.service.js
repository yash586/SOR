const Category = require("../models/category.model");

async function createCategoryRecord(categoryName, categoryBackGround) {
  if (!categoryName || !categoryBackGround) {
    throw new Error("Missing Fields");
  }

  const createCategory = await Category.create({
    categoryName,
    categoryBackGround,
    active: 1,
  });
  return createCategory.ID;
}

module.exports = { createCategoryRecord };
