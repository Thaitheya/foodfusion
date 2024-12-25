import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Title from "../Title/Title";
import { changePassword } from "../../services/AuthService"; // Assuming this function will handle the API request

const Changepassword = () => {
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const submit = async (data) => {
    const { oldPassword, newPassword } = data;

    try {
      // Call the service to update the password
      const response = await changePassword(oldPassword, newPassword);
      setMessage("Password updated successfully!");
    } catch (error) {
      setMessage("Failed to update password.");
    }
  };

  return (
    <div>
      <Title title="Change Password" />
      <form onSubmit={handleSubmit(submit)}>
        {/* Old Password */}
        <div className="mb-3">
          <label htmlFor="oldPassword" className="form-label">
            Old Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.oldPassword ? "is-invalid" : ""}`}
            id="oldPassword"
            {...register("oldPassword", {
              required: "Old password is required",
            })}
          />
          {errors.oldPassword && (
            <div className="invalid-feedback">{errors.oldPassword.message}</div>
          )}
        </div>

        {/* New Password */}
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className={`form-control ${errors.newPassword ? "is-invalid" : ""}`}
            id="newPassword"
            {...register("newPassword", {
              required: "New password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          {errors.newPassword && (
            <div className="invalid-feedback">{errors.newPassword.message}</div>
          )}
        </div>

        {/* Confirm New Password */}
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm New Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.confirmPassword ? "is-invalid" : ""
            }`}
            id="confirmPassword"
            {...register("confirmPassword", {
              required: "Please confirm your new password",
              validate: (value) => {
                const { newPassword } = getValues();
                return value === newPassword || "Passwords do not match";
              },
            })}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">
              {errors.confirmPassword.message}
            </div>
          )}
        </div>

        {/* Message for success or failure */}
        {message && (
          <div
            className={`alert ${
              message.includes("successfully")
                ? "alert-success"
                : "alert-danger"
            }`}
            role="alert"
          >
            {message}
          </div>
        )}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Changepassword;
