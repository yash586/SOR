const express = require("express");
const categoryController = require("../controllers/category.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.post(
  "/create",
  authMiddleware.authenticateUser,
  categoryController.createCategory,
);

module.exports = router;
