import { Route, Routes, BrowserRouter as Router } from "react-router-dom"
import "./App.module.css"
import SignupPage from "./pages/SignupPage"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import Profile from "./pages/Profile"
import Products from "./pages/Products"
import { AuthProvider } from "./utils/auth"
import RequireAuth from "./components/RequireAuth"
import SingleProduct from "./pages/SingleProduct"
import { ChangePassword } from "./pages/ChangePassword"

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
            <Route
              path="/products"
              element={
                <RequireAuth>
                  <Products />
                </RequireAuth>
              }
            />
            <Route
              path="/products/:id"
              element={
                <RequireAuth>
                  <SingleProduct />
                </RequireAuth>
              }
            />
            <Route path="/changepassword" element={<ChangePassword />} />
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  )
}

export default App
