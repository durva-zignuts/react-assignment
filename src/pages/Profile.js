// import { useAuth } from "../utils/auth"
// import { Link } from "react-router-dom"
// import * as yup from "yup"
// import { useForm } from "react-hook-form"
// import { yupResolver } from "@hookform/resolvers/yup"
// import { useState } from "react"
// import Navbar from "../components/Navbar"

// const Profile = () => {
//   const auth = useAuth()
//   const [error, setError] = useState(false)
//   const [successMessage, setSuccessMessage] = useState("")

//   const loggedInUser = auth.user

//   const allUsers = JSON.parse(localStorage.getItem("users"))
//   //   const userDetail = allUsers?.find((user) => user.email === loggedInUser.email)
//   const userDetail = allUsers?.filter((user) => {
//     return loggedInUser.email === user.email
//   })
//   const data = userDetail[0]
//   console.log("data", data)
//   const [userData, setUserData] = useState(data)

//   const handleFieldChange = (event) => {
//     // console.log("onchange")
//     const { name, value } = event.target
//     setUserData({
//       ...userData,
//       [name]: value,
//     })
//     // console.log("userdata", userData)
//   }

//   const onSubmit = (submittedData) => {
//     // console.log("profile", submittedData)
//     const userIndex = allUsers.findIndex((user) => user.email === data?.email)

//     // check email is already exists or not
//     const emailExists = allUsers?.filter(
//       (user) => user.email === submittedData.email
//     )

//     console.log(emailExists.length)

//     if (emailExists.length > 0 && submittedData.email !== data?.email) {
//       setError("Email Already exists.")
//       setTimeout(() => {
//         setError("")
//       }, 2000)
//     } else {
//       if (userIndex !== -1) {
//         // Update the user's data with the submitted data
//         allUsers[userIndex] = { ...data, ...submittedData }

//         // Save the updated data back to local storage
//         localStorage.setItem("users", JSON.stringify(allUsers))

//         // Set a success message
//         setSuccessMessage("Profile updated successfully")

//         // Clear the success message after 5 seconds (5000 milliseconds)
//         setTimeout(() => {
//           setSuccessMessage("")
//         }, 5000)
//       } else {
//         setError("User not found")
//       }
//     }
//   }

//   const schema = yup.object().shape({
//     firstName: yup.string().required(),
//     lastName: yup.string().required(),
//     mobileNumber: yup.string().min(10).max(10).required(),
//     email: yup.string().email().required(),
//   })

//   const {
//     handleSubmit,
//     register,
//     formState: { errors },
//   } = useForm({ resolver: yupResolver(schema) })

//   return (
//     <div className="container">
//       <Navbar />
//       {error && <p>{error}</p>}
//       {successMessage && <p className="success-message">{successMessage}</p>}
//       <div className="container">
//         <form onSubmit={handleSubmit(onSubmit)} className="signupForm">
//           <h3 className="text-center mb-4">Edit Profile</h3>

//           <div className="w-25 mb-3">
//             <label htmlFor="firstName" className="form-label">
//               First Name
//             </label>
//             <input
//               className="form-control"
//               type="text"
//               placeholder="First Name"
//               name="firstName"
//               defaultValue={data?.firstName}
//               onChange={handleFieldChange}
//               {...register("firstName")}
//             />
//             <div className="form-text">
//               {errors.firstName && <>{errors.firstName.message}</>}
//             </div>
//           </div>

//           <div className="w-25 mb-3">
//             <label htmlFor="lastName" className="form-label">
//               Last Name
//             </label>
//             <input
//               className="form-control"
//               type="text"
//               placeholder="Last Name"
//               name="lastName"
//               {...register("lastName")}
//               defaultValue={data?.lastName}
//               onChange={handleFieldChange}
//             />
//             <div className="form-text">
//               {errors.lastName && <>{errors.lastName.message}</>}
//             </div>
//           </div>

//           <div className="w-25 mb-3">
//             <label htmlFor="mobileNumber" className="form-label">
//               Mobile Number
//             </label>
//             <input
//               className="form-control"
//               type="number"
//               placeholder="Mobile Number"
//               name="mobileNumber"
//               {...register("mobileNumber")}
//               defaultValue={data?.mobileNumber}
//               onChange={handleFieldChange}
//             />
//             <div className="form-text">
//               {errors.mobileNumber && <>{errors.mobileNumber.message}</>}
//             </div>
//           </div>

//           <div className="w-25 mb-3">
//             <label htmlFor="email" className="form-label">
//               Email
//             </label>
//             <input
//               className="form-control"
//               type="email"
//               placeholder="Email"
//               name="email"
//               {...register("email")}
//               defaultValue={data?.email}
//               onChange={handleFieldChange}
//             />
//             <div className="form-text">
//               {errors.email && <>{errors.email.message}</>}
//             </div>
//           </div>

//           <div>
//             <button type="submit" className="btn btn-primary me-3">
//               Save
//             </button>

//             <Link to="/changepassword" className="me-2">
//               Reset Password
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default Profile

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
  const userDetail = allUsers?.filter((user) => {
    return loggedInUser.email === user.email
  })
  const data = userDetail[0]
  const [userData, setUserData] = useState(data)

  const handleFieldChange = (event) => {
    const { name, value } = event.target
    setUserData({
      ...userData,
      [name]: value,
    })
  }

  const onSubmit = (submittedData) => {
    const userIndex = allUsers.findIndex((user) => user.email === data?.email)
    const emailExists = allUsers?.filter(
      (user) => user.email === submittedData.email
    )

    if (emailExists.length > 0 && submittedData.email !== data?.email) {
      setError("Email Already exists.")
      setTimeout(() => {
        setError("")
      }, 2000)
    } else {
      if (userIndex !== -1) {
        allUsers[userIndex] = { ...data, ...submittedData }
        localStorage.setItem("users", JSON.stringify(allUsers))
        setSuccessMessage("Profile updated successfully")
        setTimeout(() => {
          setSuccessMessage("")
        }, 5000)
      } else {
        setError("User not found")
      }
    }
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
    <div className="container mt-5">
      <Navbar />
      {error && <p className="alert alert-danger">{error}</p>}
      {successMessage && (
        <p className="alert alert-success">{successMessage}</p>
      )}
      <div className="container mt-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto">
          <h3 className="text-center mb-4">Edit Profile</h3>

          <div className="mb-3">
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="First Name"
              name="firstName"
              defaultValue={data?.firstName}
              onChange={handleFieldChange}
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-danger">{errors.firstName.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Last Name"
              name="lastName"
              {...register("lastName")}
              defaultValue={data?.lastName}
              onChange={handleFieldChange}
            />
            {errors.lastName && (
              <p className="text-danger">{errors.lastName.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="mobileNumber" className="form-label">
              Mobile Number
            </label>
            <input
              className="form-control"
              type="number"
              placeholder="Mobile Number"
              name="mobileNumber"
              {...register("mobileNumber")}
              defaultValue={data?.mobileNumber}
              onChange={handleFieldChange}
            />
            {errors.mobileNumber && (
              <p className="text-danger">{errors.mobileNumber.message}</p>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              {...register("email")}
              defaultValue={data?.email}
              onChange={handleFieldChange}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>

          <div>
            <button type="submit" className="btn btn-primary me-3">
              Save
            </button>
            <Link to="/changepassword" className="btn btn-secondary">
              Reset Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
