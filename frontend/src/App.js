import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cars from "./pages/Cars";
import BookCar from "./pages/BookCar";
import AdminAddCar from "./pages/AdminAddCar";

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 10 }}>
        <Link to="/">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/cars">Cars</Link> |{" "}
        <Link to="/admin/add-car">Add Car</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/book/:id" element={<BookCar />} />
        <Route path="/admin/add-car" element={<AdminAddCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
