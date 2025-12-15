const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: true
  },
  startDate: Date,
  endDate: Date,
  totalAmount: Number,
  status: {
    type: String,
    default: "Booked"
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
