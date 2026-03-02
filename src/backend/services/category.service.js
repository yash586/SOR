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

  return createCategory;
}

async function listCategories() {
  const records = await Category.findAll({
    where: { active: true },
  });
  if (!records || records.length === 0) {
    throw new Error("No Records Found");
  }
  const result = records.map((list) => ({
    id: list.categoryid,
    categoryid: list.ID,
    categoryName: list.categoryName,
    categoryBackGround: list.categoryBackGround,
    active: list.active,
  }));
  return result;
}

const getCategory = async (id) => {
  console.log(id);
  const response = await Category.findOne({
    where: { ID: id, active: 1 },
  });
  if (!response || response.length === 0) {
    throw new Error("No Records Found");
  }
  const { categoryid } = response;
  return categoryid;
};
module.exports = { createCategoryRecord, listCategories, getCategory };
