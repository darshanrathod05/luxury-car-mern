import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

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
    <div>
      <h2>Book Car</h2>

      <label>Start Date:</label><br />
      <input type="date" onChange={e => setStartDate(e.target.value)} />
      <br /><br />

      <label>End Date:</label><br />
      <input type="date" onChange={e => setEndDate(e.target.value)} />
      <br /><br />

      <button onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default BookCar;
