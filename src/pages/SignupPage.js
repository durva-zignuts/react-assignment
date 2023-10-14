import React, { useState } from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { Link } from "react-router-dom"
import "./Signup.css"
import { regex } from "../App"
import { encryptPassword } from "../utils/helperFunctions"

export default function SignupPage() {
  // const [users, setUsers] = useState([])
  const [successMessage, setSuccessMessage] = useState("")
  const [error, setError] = useState(false)

  let userData = ""

  const onSubmit = (submittedData) => {
    const hash = encryptPassword(submittedData.password)

    submittedData.password = hash
    submittedData.confirmPassword = hash

    let users = JSON.parse(localStorage.getItem("users") || "[]")

    // Check If the User is Already Registered or Not
    userData = users?.filter((user) => {
      return user.email === submittedData.email
    })

    console.log("userdata", userData.length)
    if (userData.length > 0) {
      // return
      setError(true)

      setTimeout(() => {
        setError(false)
      }, 5000)
    } else {
      // const newUser = { ...submittedData }
      // setUsers((prevUsers) => [...prevUsers, newUser])
      // localStorage.setItem("currentSignUpUser", JSON.stringify(submittedData))

      users.push(submittedData)
      localStorage.setItem("users", JSON.stringify(users))
      setSuccessMessage("Signup successful!")

      // Clear the success message after 5 seconds (5000 milliseconds)
      setTimeout(() => {
        setSuccessMessage("")
      }, 5000)
    }

    // let users = JSON.parse(localStorage.getItem("users") || "[]")
    // users.push(submittedData)
    // localStorage.setItem("users", JSON.stringify(users))
  }

  // useEffect(() => {
  //   localStorage.setItem("users", JSON.stringify(users))
  // }, [users])

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    mobileNumber: yup.string().min(10).max(10).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .max(32)
      .min(8)
      .matches(
        regex,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required(),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  return (
    <div>
      {error && <p>User Already Exists.</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="signupForm">
        <div className="input-div">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            name="firstName"
          />
        </div>
        {errors.firstName && (
          <h4 className="error">{errors.firstName.message}</h4>
        )}
        <div className="input-div">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            {...register("lastName")}
          />
        </div>
        {errors.lastName && (
          <h4 className="error">{errors.lastName.message}</h4>
        )}
        <div className="input-div">
          <label htmlFor="mobileNumber">Mobile Number</label>
          <input
            type="number"
            placeholder="Mobile Number"
            name="mobileNumber"
            {...register("mobileNumber")}
          />
        </div>
        {errors.mobileNumber && (
          <h4 className="error">{errors.mobileNumber.message}</h4>
        )}
        <div className="input-div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
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
            placeholder="Password"
            name="password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <h4 className="error">{errors.password.message}</h4>
        )}
        <div className="input-div">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && <h4>{errors.confirmPassword.message}</h4>}
        <div>
          <button type="submit">SignUp</button>
          {console.log("errors : ", errors)}
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  )
}
