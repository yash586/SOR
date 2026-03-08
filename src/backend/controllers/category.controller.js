const {
  createCategoryRecord,
  listCategories,
  categoryDelete,
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

async function deleteCategory(req, res) {
  const { categoryId } = req.params;
  try {
    const record = await categoryDelete(categoryId);
    res.status(200).json({
      message: "Category deleted",
      data: record,
    });
  } catch (error) {}
}

module.exports = { createCategory, getCategory, deleteCategory };
