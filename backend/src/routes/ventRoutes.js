const express = require("express");

const {
  createVent,
  getAllVents,
  getVentById,
} = require("../controllers/ventController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllVents);
router.get("/:id", getVentById);

router.post("/", protect, createVent);

module.exports = router;