const express = require("express");
const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post(
  "/createCategory",
  authMiddleware.authenticateUser,
  categoryController.createCategory,
);

router.get(
  "/listCategories",
  authMiddleware.authenticateUser,
  categoryController.getCategory,
);
module.exports = router;
