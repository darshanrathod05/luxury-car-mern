const express = require("express");
const router = express.Router();
const Car = require("../models/Car");
const adminMiddleware = require("../middleware/adminMiddleware");
const multer = require("multer");

/* ================= IMAGE UPLOAD SETUP ================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* ================= GET ALL CARS ================= */
router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch cars" });
  }
});

/* ================= GET SINGLE CAR (IMPORTANT) ================= */
router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch car" });
  }
});

/* ================= ADD CAR (ADMIN ONLY) ================= */
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
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: "Failed to add car" });
  }
});

/* ================= DELETE CAR (ADMIN ONLY) ================= */
router.delete("/:id", adminMiddleware, async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json({ message: "Car deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete car" });
  }
});

module.exports = router;
