const express = require("express");
const router = express.Router();

// controllers
const {
  getTests,
  getTest,
  setTest,
  updateTest,
  deleteTest,
} = require("../controllers/testController");
const { userProtected } = require("../middleware/authMiddleware");

// routes
router.get("/", userProtected, getTests);
router.get("/:id", userProtected, getTest);
router.post("/", userProtected, setTest);
router.put("/:id", userProtected, updateTest);
router.delete("/:id", userProtected, deleteTest);

module.exports = router;
