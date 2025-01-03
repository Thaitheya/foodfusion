import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import Title from "../../components/Title/Title";
import Changepassword from "../../components/changepassword/Changepassword";

const Profile = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { user, updateProfile } = useAuth();

  const submit = (updatedUser) => {
    if (!updatedUser.name || !updatedUser.address) {
      toast.error("Please fill out all fields before submitting.");
      return;
    }

    updateProfile(updatedUser);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="container mt-5">
      <div className="text-center mb-4">
        <Title title="Profile Settings" fontSize="2.5rem" />
        <p className="text-muted">
          Manage your profile information and update your password.
        </p>
      </div>

      <div className="row justify-content-center g-4">
        <div className="col-lg-5 col-md-6">
          <div className="card border-0 shadow-sm rounded-lg p-4">
            <h4 className="card-title text-center mb-4 text-danger">
              Update Profile
            </h4>
            <form onSubmit={handleSubmit(submit)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  <strong>Name</strong>
                </label>
                <input
                  defaultValue={user.name}
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  id="name"
                  placeholder="Enter your full name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 5,
                      message: "Name must be at least 5 characters long",
                    },
                  })}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  <strong>Address</strong>
                </label>
                <input
                  defaultValue={user.address}
                  type="text"
                  className={`form-control ${
                    errors.address ? "is-invalid" : ""
                  }`}
                  id="address"
                  placeholder="Enter your address"
                  {...register("address", {
                    required: "Address is required",
                    minLength: {
                      value: 10,
                      message: "Address must be at least 10 characters long",
                    },
                  })}
                />
                {errors.address && (
                  <div className="invalid-feedback">
                    {errors.address.message}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-danger w-100 mt-3">
                Update Profile
              </button>
            </form>
          </div>
        </div>
        <div className="col-lg-5 col-md-6">
          <div className="card border-0 shadow-sm rounded-lg p-4">
            <h4 className="card-title text-center mb-4 text-primary">
              Change Password
            </h4>
            <Changepassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
