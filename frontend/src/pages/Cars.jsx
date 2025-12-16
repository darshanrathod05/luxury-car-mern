import { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "./Cars.css";

function Cars() {
  const [cars, setCars] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadCars();
    checkAdmin();
  }, []);

  // Fetch all cars
  const loadCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Check admin role from JWT
  const checkAdmin = () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.role === "admin") {
      setIsAdmin(true);
    }
  };

  // ✅ BOOK HANDLER (BLOCK ADMIN)
  const handleBook = (carId) => {
    if (isAdmin) {
      alert("Admin is not allowed to book cars");
      return;
    }
    navigate(`/book/${carId}`);
  };

  // Delete car (admin only)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;

    try {
      await API.delete(`/cars/${id}`);
      setCars((prev) => prev.filter((car) => car._id !== id));
      alert("Car deleted successfully");
    } catch (err) {
      alert("Failed to delete car");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="cars-page">

      {/* ===== TOP NAV BAR ===== */}
      <div className="top-bar">
        <div className="nav-left">Cars</div>

        <div className="nav-actions">
          {isAdmin && (
            <Link to="/admin/add-car" className="add-car-link">
              Add Car
            </Link>
          )}
          <div className="nav-right" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>

      {/* ===== PAGE TITLE ===== */}
      <h2>Available Cars</h2>

      {cars.length === 0 && <p>No cars available</p>}

      {/* ===== CARS GRID ===== */}
      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car._id} className="car-card">

            {/* Image */}
            {car.image && (
              <img
                src={`http://localhost:5000${car.image}`}
                alt={`${car.brand} ${car.model}`}
              />
            )}

            {/* Info */}
            <div className="car-info">
              <h3>{car.brand} {car.model}</h3>

              <p className="rent">
                Rent / day: <span>₹{car.rentPerDay}</span>
              </p>

              <p className="price">
                Price: ₹{car.price}
              </p>

              {/* Buttons */}
              <div className="car-buttons">
                <button
                  className="book-btn"
                  onClick={() => handleBook(car._id)}
                >
                  Book Now
                </button>

                {isAdmin && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(car._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
