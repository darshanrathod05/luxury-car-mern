import { useState } from "react";
import API from "../services/api";

function AdminAddCar() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [rentPerDay, setRentPerDay] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleAddCar = async () => {
    try {
      const formData = new FormData();
      formData.append("brand", brand);
      formData.append("model", model);
      formData.append("rentPerDay", rentPerDay);
      formData.append("price", price);
      formData.append("image", image);

      await API.post("/cars", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("Car added successfully!");
      window.location.href = "/cars";
    } catch (err) {
      alert("Only admin can add cars");
    }
  };

  return (
    <div>
      <h2>Add Car (Admin)</h2>

      <input placeholder="Brand" onChange={e => setBrand(e.target.value)} /><br /><br />
      <input placeholder="Model" onChange={e => setModel(e.target.value)} /><br /><br />
      <input placeholder="Rent Per Day" onChange={e => setRentPerDay(e.target.value)} /><br /><br />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} /><br /><br />

      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files[0])}
      />
      <br /><br />

      <button onClick={handleAddCar}>Add Car</button>
    </div>
  );
}

export default AdminAddCar;
