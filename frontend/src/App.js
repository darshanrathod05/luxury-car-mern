import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cars from "./pages/Cars";
import BookCar from "./pages/BookCar";
import AdminAddCar from "./pages/AdminAddCar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/book/:id" element={<BookCar />} />
        <Route path="/admin/add-car" element={<AdminAddCar />} />
      </Routes>
    </Router>
  );
}

export default App;
