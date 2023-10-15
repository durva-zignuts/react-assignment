import React from "react"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs-react"
import { useState } from "react"

import "./Signup.css"
import { useAuth } from "../utils/auth"
import { regex } from "../App"

export default function LoginPage() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const auth = useAuth()

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .max(32)
      .min(8)
      .matches(regex, "Incorrect Password"),
  })

  const onSubmit = (submittedData) => {
    console.log(submittedData)
    // localStorage.setItem("currentLoggedInUser", JSON.stringify(submittedData));
    const allUsersData = JSON.parse(localStorage.getItem("users"))
    console.log(allUsersData)
    const userData = allUsersData?.filter((user) => {
      return user.email === submittedData.email
    })
    console.log("login", userData)
    if (userData?.length > 0) {
      const result = bcrypt.compareSync(
        submittedData.password,
        userData[0].password
      )

      if (result) {
        // password match
        auth.login(userData[0])
        navigate("/products", { replace: true })
      } else {
        setError("Password does not match.")
      }

      console.log(result)
    } else {
      setError("User doesn't exist.")
    }
    return
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  return (
    <div className="container h-100">
      {error && <p className="alert alert-danger">{error}</p>}
      <div className="row align-items-center" style={{ height: "100vh" }}>
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-4 border rounded bg-white"
          >
            <h3 className="text-center mb-4">Login Form</h3>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="Email"
                name="email"
                {...register("email")}
              />
              <div className="form-text">
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                {...register("password")}
              />
              <div className="form-text">
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="text-center mb-2">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <div className="text-center">
              Don't have an account? <Link to="/signup">Signup Here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
