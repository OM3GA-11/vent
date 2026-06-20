const express = require("express");

const { voteVent } = require("../controllers/voteController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, voteVent);

module.exports = router;