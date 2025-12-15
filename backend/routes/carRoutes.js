const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const adminMiddleware = require("../middleware/adminMiddleware");
const multer = require("multer");

/* IMAGE UPLOAD SETUP */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* GET ALL CARS */
router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});

/* ADD CAR (ADMIN ONLY) */
router.post("/", adminMiddleware, upload.single("image"), async (req, res) => {
  try {
    const car = new Car({
      brand: req.body.brand,
      model: req.body.model,
      rentPerDay: req.body.rentPerDay,
      price: req.body.price,
      image: req.file ? `/uploads/${req.file.filename}` : ""
    });

    await car.save();
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Failed to add car" });
  }
});

module.exports = router;
