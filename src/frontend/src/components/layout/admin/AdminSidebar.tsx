import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../store/AuthContext";

const AdminSidebar = () => {
  const {logout, hashId } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white"
      style={{ width: "280px", minHeight: "100vh", backgroundColor: "#9A616D" }}
    >
      {/* Logo */}
      <NavLink
        to="/dashboard"
        className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span className="fs-4 fw-bold">⚠️ EHS</span>
      </NavLink>
      <hr />
      <ul className="nav nav-pills flex-column ">
        <li className="nav-item">
          <NavLink
            to="/category"
            className={({ isActive }) =>
              `nav-link ${isActive ? "active text-dark" : "text-white"}`
            }
          >
            🏠 Category
          </NavLink>
        </li>
      </ul>
      <hr/>
      <div className="dropdown">
        <button
          className="btn d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{ background: "none", border: "none" }}
        >
          <img
            src=""
            alt=""
            width="32"
            height="32"
            className="rounded-circle me-2"
          />
          <strong>{hashId ?? "User"}</strong>
        </button>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <button className="dropdown-item" onClick={() => navigate("/profile")}>
              Profile
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={() => navigate("/dashboard")}>
              Home
            </button>
          </li>
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button
              className="dropdown-item text-danger"
              onClick={handleLogout}
            >
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default AdminSidebar;