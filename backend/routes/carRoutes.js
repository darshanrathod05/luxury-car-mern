const express = require("express");
const { addCar, getCars } = require("../controllers/carController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/", getCars);
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  addCar
);

module.exports = router;

