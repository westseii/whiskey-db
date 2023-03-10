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

// routes
router.get("/", getTests);
router.get("/:id", getTest);
router.post("/", setTest);
router.put("/:id", updateTest);
router.delete("/:id", deleteTest);

module.exports = router;
