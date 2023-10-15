import React from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../utils/auth.js"

const Navbar = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  const navLinkStyles = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
    }
  }

  const handleLogout = () => {
    auth.logout()
    navigate("/login")
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/products">
            Shopping Site
          </NavLink>

          <span className="navbar-text">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  style={navLinkStyles}
                  className="nav-link active"
                  aria-current="page"
                  to="/products"
                >
                  All Products
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  style={navLinkStyles}
                  className="nav-link"
                  to="/profile"
                >
                  Edit Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
              </li>
            </ul>
          </span>
        </div>
      </nav>
    </>
  )
}

export default Navbar
