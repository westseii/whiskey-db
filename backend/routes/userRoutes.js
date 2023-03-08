const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "get" });
});

router.post("/", (req, res) => {
  res.status(200).json({ message: "set" });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ message: `update: ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `delete: ${req.params.id}` });
});

module.exports = router;
