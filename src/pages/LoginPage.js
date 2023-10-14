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
    password: yup.string().required().max(32).min(8).matches(regex),
  })

  const onSubmit = (submittedData) => {
    console.log(submittedData)
    // localStorage.setItem("currentLoggedInUser", JSON.stringify(submittedData))
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
        setError("Password not match.")
      }

      console.log(result)
    } else {
      setError("User doesn't exists.")
    }
    return
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  return (
    <div>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            {...register("email")}
          />
        </div>
        {errors.email && <h4 className="error">{errors.email.message}</h4>}

        <div className="input-div">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <h4 className="error">{errors.password.message}</h4>
        )}
        <div>
          <button type="submit">Login</button>
          <Link to="/signup">SignUp</Link>
        </div>
      </form>
    </div>
  )
}
