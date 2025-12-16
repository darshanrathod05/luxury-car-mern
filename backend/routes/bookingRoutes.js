const express = require("express");
const {
  createBooking,
  getBookings
} = require("../controllers/bookingController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createBooking);      // logged users
router.get("/", protect, adminOnly, getBookings); // admin only

module.exports = router;


