import React from "react"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import "./Signup.css"

export const ChangePassword = () => {
  let regex =
    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
  const schema = yup.object().shape({
    oldPassword: yup
      .string()
      .required()
      .matches(
        regex,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    newPassword: yup
      .string()
      .required()
      .matches(
        regex,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      )
      .notOneOf(
        [yup.ref("oldPassword")],
        "Password should not be same as the old password"
      ),
    confirmNewPassword: yup
      .string()
      .oneOf([yup.ref("newPassword")], "New passwords doesn't match ")
      .required(),
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (submittedData) => {
    console.log(submittedData)
    console.log(errors)
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-div">
          <label htmlFor="oldPassword">Old Password</label>
          <input
            type="password"
            name="oldPassword"
            id="oldPassword"
            {...register("oldPassword")}
          />
        </div>
        {errors.oldPassword && (
          <h4 className="error">{errors.oldPassword.message}</h4>
        )}
        <div className="input-div">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            {...register("newPassword")}
          />
        </div>
        {errors.newPassword && (
          <h4 className="error">{errors.newPassword.message}</h4>
        )}
        <div className="input-div">
          <label htmlFor="confirmNewPassword">Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPassword"
            id="confirmNewPassword"
            {...register("confirmNewPassword")}
          />
        </div>
        {errors.confirmNewPassword && (
          <h4 className="error">{errors.confirmNewPassword.message}</h4>
        )}
        <div className="submit">
          <button type="submit">Change Password</button>
        </div>
      </form>
    </div>
  )
}
