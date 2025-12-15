import { Link } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  let role = "";

  if (token) {
    const decoded = JSON.parse(atob(token.split(".")[1]));
    role = decoded.role;
  }

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav style={{ padding: 10, borderBottom: "1px solid #ccc" }}>
      <Link to="/cars">Cars</Link>

      {role === "admin" && (
        <>
          {" | "}
          <Link to="/admin/add-car">Add Car</Link>
        </>
      )}

      {" | "}
      <button onClick={logout}>Logout</button>
    </nav>
  );
}

export default Navbar;
