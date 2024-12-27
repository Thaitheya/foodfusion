import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Title from "../Title/Title";
import { useAuth } from "../../Hooks/useAuth";

const Changepassword = () => {
  const [message, setMessage] = useState("");
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const { changePassword } = useAuth();
  const submit = async (password) => {
    changePassword(password);
  };

  return (
    <div>
      <Title title="Change Password" />
      <form onSubmit={handleSubmit(submit)}>
        {/* Old Password */}
        <div className="mb-3">
          <label htmlFor="Current Password" className="form-label">
            Current Password
          </label>
          <input
            type="password"
            className={`form-control ${
              errors.currentPassword ? "is-invalid" : ""
            }`}
            id="currentPassword"
            {...register("currentPassword", {
              required: "current password is required",
            })}
          />
          {errors.currentPassword && (
            <div className="invalid-feedback">
              {errors.currentPassword.message}
            </div>
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

        <button type="submit" className="btn btn-danger w-100">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default Changepassword;
