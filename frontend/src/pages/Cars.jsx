import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Cars() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    API.get("/cars")
      .then(res => setCars(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h2>Luxury Cars</h2>

      {cars.length === 0 && <p>No cars available</p>}

      {cars.map(car => (
        <div key={car._id} style={{ border: "1px solid #ccc", padding: 10, margin: 10 }}>
          
          {car.image && (
            <img src={`http://localhost:5000${car.image}`} alt="car" width="250"/>
          )}

          <h3>{car.brand} {car.model}</h3>
          <p>Rent per day: ₹{car.rentPerDay}</p>
          <p>Price: ₹{car.price}</p>

          <Link to={`/book/${car._id}`}>
            <button>Book</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Cars;
