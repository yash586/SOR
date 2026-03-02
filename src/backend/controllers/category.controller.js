const {
  createCategoryRecord,
  listCategories,
} = require("../services/category.service");

async function createCategory(req, res) {
  try {
    const { categoryName, categoryBackGround } = req.body;
    const category = await createCategoryRecord(
      categoryName,
      categoryBackGround,
    );
    res.status(200).json({
      message: "New Category Created",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function getCategory(req, res) {
  try {
    const category = await listCategories();
    res.status(200).json({
      message: "Success",
      data: category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { createCategory, getCategory };
