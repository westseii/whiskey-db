const express = require("express");
const router = express.Router();

// controllers
const { registerUser, authenticateUser, currentUser } = require("../controllers/userController");

// routes
router.post("/register", registerUser);
router.post("/authenticate", authenticateUser);
router.get("/current", currentUser);

module.exports = router;
