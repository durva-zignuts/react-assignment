import React from "react"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import "./Signup.css"

export default function LoginPage() {
  let regex =
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().max(32).min(8).matches(regex),
  })

  const onSubmit = (submittedData) => {
    console.log(submittedData)
    localStorage.setItem("currentLoggedInUser", JSON.stringify(submittedData))
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  return (
    <div>
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
