import { useState, useEffect } from "react";
import API from "../services/api";
import "./FormTemplate.css";

function AdminAddCar() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  // 🔐 Admin protection
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/";
      return;
    }

    const decoded = JSON.parse(atob(token.split(".")[1]));
    if (decoded.role !== "admin") {
      alert("Admins only");
      window.location.href = "/cars";
    }
  }, []);

  const handleAddCar = async () => {
    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("rentPerDay", rentPerDay);
      formData.append("price", price);
      formData.append("image", image);

      await API.post("/cars", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Car added successfully!");
      window.location.href = "/cars";
    } catch (err) {
      alert("Failed to add car");
    }
  };

  return (
    <div className="form-container">
      {/* LEFT IMAGE */}
      <div className="form-image">
        <img
          src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=900&q=80"
          alt="Admin Car"
        />
        <h3>Elite Drive</h3>
      </div>

      {/* RIGHT FORM */}
      <div className="form-box">
        <h2>ADD CAR</h2>
        <p className="subtitle">Admin dashboard</p>

        <input placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
        <input placeholder="Model" onChange={(e) => setModel(e.target.value)} />
        <input placeholder="Rent Per Day" onChange={(e) => setRentPerDay(e.target.value)} />
        <input placeholder="Price" onChange={(e) => setPrice(e.target.value)} />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={handleAddCar}>Add Car</button>
      </div>
    </div>
  );
}

export default AdminAddCar;
