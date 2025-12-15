import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";
import "./FormTemplate.css";

function BookCar() {
  const { id } = useParams();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      const decoded = JSON.parse(atob(token.split(".")[1]));

      await API.post("/bookings", {
        userId: decoded.id,
        carId: id,
        startDate,
        endDate
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
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80"
          alt="Luxury Car"
        />
        <h3>Elite Drive</h3>
      </div>

      {/* RIGHT FORM */}
      <div className="form-box">
        <h2>BOOK CAR</h2>
        <p className="subtitle">Select rental dates</p>

        <label>Start Date</label>
        <input type="date" onChange={(e) => setStartDate(e.target.value)} />

        <label>End Date</label>
        <input type="date" onChange={(e) => setEndDate(e.target.value)} />

        <button onClick={handleBooking}>Confirm Booking</button>
      </div>
    </div>
  );
}

export default BookCar;
