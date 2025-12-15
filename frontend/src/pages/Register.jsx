import { useState } from "react";
import API from "../services/api";
import "./Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", { name, email, password });
      alert("Registration successful. Please login.");
      window.location.href = "/";
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="register-page">
      {/* LEFT – HERO SECTION */}
      <div className="register-hero">
        <h1>Elite Drive</h1>
        <h2>Car Rental Website</h2>
        <p>
          Your journey, your car, your way.  
          Experience premium rentals with Elite Drive.
        </p>

        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
          alt="Luxury Car"
        />
      </div>

      {/* RIGHT – REGISTER FORM */}
      <div className="register-form">
        <h2>REGISTER</h2>
        <p className="subtitle">Create your Elite Drive account</p>

        <input
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Register</button>

        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => (window.location.href = "/")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
