import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import "./FormTemplate.css";

function BookCar() {
  const { id } = useParams();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [car, setCar] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);

  /* FETCH CAR DETAILS */
  useEffect(() => {
    API.get(`/cars/${id}`)
      .then((res) => setCar(res.data))
      .catch(() => alert("Failed to load car details"));
  }, [id]);

  /* CALCULATE PRICE WHEN DATES CHANGE */
  useEffect(() => {
    if (startDate && endDate && car) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      if (end >= start) {
        const days =
          Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
        setTotalPrice(days * car.rentPerDay);
      } else {
        setTotalPrice(null);
      }
    }
  }, [startDate, endDate, car]);

  const handleBooking = async () => {
    if (!startDate || !endDate) {
      alert("Please select dates");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const decoded = JSON.parse(atob(token.split(".")[1]));

      await API.post("/bookings", {
        userId: decoded.id,
        carId: id,
        startDate,
        endDate,
        totalPrice
      });

      alert("Booking successful!");
      window.location.href = "/cars";
    } catch (err) {
      alert("Booking failed");
    }
  };

  return (
    <div className="form-container">
      {/* LEFT IMAGE */}
      <div className="form-image">
        <img
          src={
            car?.image
              ? `http://localhost:5000${car.image}`
              : "https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          }
          alt="Luxury Car"
        />
        <h3>Elite Drive</h3>
      </div>

      {/* RIGHT FORM */}
      <div className="form-box">
        <h2>BOOK CAR</h2>
        <p className="subtitle">
          {car ? `${car.brand} ${car.model}` : "Loading..."}
        </p>

        <label>Start Date</label>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />

        <label>End Date</label>
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />

        {totalPrice !== null && (
          <div className="price-box">
            <p>
              <strong>Total Price:</strong>{" "}
              <span>₹{totalPrice}</span>
            </p>
          </div>
        )}

        <button onClick={handleBooking}>Confirm Booking</button>
      </div>
    </div>
  );
}

export default BookCar;
