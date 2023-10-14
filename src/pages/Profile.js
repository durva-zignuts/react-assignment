import { useAuth } from "../utils/auth"
import { Link } from "react-router-dom"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { useState } from "react"
import Navbar from "../components/Navbar"

const Profile = () => {
  const auth = useAuth()
  const [error, setError] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")

  const loggedInUser = auth.user

  const allUsers = JSON.parse(localStorage.getItem("users"))
  //   const userDetail = allUsers?.find((user) => user.email === loggedInUser.email)
  const userDetail = allUsers?.filter((user) => {
    return loggedInUser.email === user.email
  })
  const data = userDetail[0]
  console.log("data", data)
  const [userData, setUserData] = useState(data)

  const handleFieldChange = (event) => {
    console.log("onchange")
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value,
    })
    console.log("userdata", userData)
  }

  const onSubmit = (submittedData) => {
    console.log("profile", submittedData)
    // const userIndex = allUsers.findIndex((user) => user.email === data.email)
    // if (userIndex !== -1) {
    //   // Update the user's data with the submitted data
    //   allUsers[userIndex] = { ...data, ...submittedData }

    //   // Save the updated data back to local storage
    //   localStorage.setItem("users", JSON.stringify(allUsers))

    //   // Set a success message
    //   setSuccessMessage("Profile updated successfully")
    // } else {
    //   setError("User not found")
    // }
  }

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    mobileNumber: yup.string().min(10).max(10).required(),
    email: yup.string().email().required(),
  })

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  return (
    <div>
      <Navbar />
      {error && <p>User Already Exists.</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)} className="signupForm">
        <div className="input-div">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            // {...register("firstName")}
            name="firstName"
            value={data.firstName}
            onChange={handleFieldChange}
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
            // {...register("lastName")}
            value={data.lastName}
            onChange={handleFieldChange}
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
            // {...register("mobileNumber")}
            value={data.mobileNumber}
            onChange={handleFieldChange}
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
            // {...register("email")}
            value={data.email}
            onChange={handleFieldChange}
          />
        </div>
        {errors.email && <h4 className="error">{errors.email.message}</h4>}

        <div>
          <button type="submit">Save</button>
          {console.log("errors : ", errors)}
          <Link to="/">Reset Password</Link>
        </div>
      </form>
    </div>
  )
}

export default Profile
