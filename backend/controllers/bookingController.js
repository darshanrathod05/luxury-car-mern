const Booking = require("../models/Booking");
const Car = require("../models/Car");

exports.createBooking = async (req, res) => {
  const { userId, carId, startDate, endDate } = req.body;

  const car = await Car.findById(carId);
  if (!car) {
    return res.status(404).json({ message: "Car not found" });
  }

  const days =
    (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

  const totalAmount = days * car.rentPerDay;

  const booking = await Booking.create({
    userId,
    carId,
    startDate,
    endDate,
    totalAmount
  });

  res.status(201).json(booking);
};

exports.getBookings = async (req, res) => {
  const bookings = await Booking.find().populate("carId").populate("userId");
  res.json(bookings);
};
