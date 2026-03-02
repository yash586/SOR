const express = require("express");
const recordController = require("../controllers/record.controller");
const authMiddleware = require("../middleware/auth.middleware");
const router = express.Router();

router.get(
  "/listView",
  authMiddleware.authenticateUser,
  recordController.getListRecords,
);

router.post(
  "/createObservation",
  authMiddleware.authenticateUser,
  recordController.createRecord,
);

router.delete(
  "/deleteObservation/:recordId",
  authMiddleware.authenticateUser,
  recordController.deleteRecord,
);

module.exports = router;
