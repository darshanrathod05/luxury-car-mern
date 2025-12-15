import { useState } from "react";
import API from "../services/api";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/cars";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      {/* Left Image Section */}
      <div className="login-image">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          alt="Luxury Car"
        />
      </div>

      {/* Right Form Section */}
      <div className="login-form">
        <h1 className="brand">🚗 Elite Drive</h1>
        <h2>Sign in to your account</h2>
        <p className="subtitle">Enter your details to proceed further</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Sign In</button>

        {/* Register link */}
        <p style={{ marginTop: "16px", fontSize: "14px" }}>
          New user?{" "}
          <span
            style={{ color: "#4f46e5", cursor: "pointer", fontWeight: "600" }}
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
