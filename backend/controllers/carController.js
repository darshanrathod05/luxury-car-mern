const Car = require("../models/Car");

exports.addCar = async (req, res) => {
  const car = await Car.create({
    brand: req.body.brand,
    model: req.body.model,
    rentPerDay: req.body.rentPerDay,
    price: req.body.price,
    image: req.file ? `/uploads/${req.file.filename}` : ""
  });

  res.status(201).json(car);
};

exports.getCars = async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
};
