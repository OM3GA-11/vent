const express = require("express");

const { createComment } = require("../controllers/commentController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createComment);

module.exports = router;