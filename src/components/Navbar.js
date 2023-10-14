import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../utils/auth.js"

const Navbar = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    navigate("/login")
  }

  return (
    <>
      {/* <nav> */}
      <Link to="/products">Products</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
      {/* </nav> */}
    </>
  )
}

export default Navbar
