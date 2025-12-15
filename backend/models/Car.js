const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  rentPerDay: { type: Number, required: true },
  price: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
  image: String
});

module.exports = mongoose.model("Car", carSchema);
