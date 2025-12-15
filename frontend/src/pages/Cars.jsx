import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import "./Cars.css";

function Cars() {
  const [cars, setCars] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Fetch cars
    API.get("/cars")
      .then((res) => setCars(res.data))
      .catch((err) => console.log(err));

    // Check role from token
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      if (decoded.role === "admin") {
        setIsAdmin(true);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="cars-page">

      {/* TOP BAR */}
      <div className="top-bar">
        <div className="nav-left">Cars</div>

        <div style={{ display: "flex", gap: "15px" }}>
          {isAdmin && (
            <Link to="/admin/add-car" style={{ color: "white", fontWeight: "bold" }}>
              Add Car
            </Link>
          )}
          <div className="nav-right" onClick={handleLogout}>
            Logout
          </div>
        </div>
      </div>

      <h2>Available Cars</h2>

      {cars.length === 0 && <p>No cars available</p>}

      <div className="cars-grid">
        {cars.map((car) => (
          <div key={car._id} className="car-card">

            {car.image && (
              <img
                src={`http://localhost:5000${car.image}`}
                alt="car"
              />
            )}

            <div className="car-info">
              <h3>{car.brand} {car.model}</h3>

              <p className="rent">
                Rent / day: <span>₹{car.rentPerDay}</span>
              </p>

              <p className="price">
                Price: ₹{car.price}
              </p>

              <Link to={`/book/${car._id}`}>
                <button className="book-btn">Book Now</button>
              </Link>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Cars;
