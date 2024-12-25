import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Hooks/useAuth";
import Title from "../../components/Title/Title";

const Profile = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const { user, updateProfile } = useAuth();

  const submit = (user) => {
    updateProfile(user)
  };

  return (
    <div className="container mt-5">
      <Title title="Update Profile" />
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form
            onSubmit={handleSubmit(submit)}
            className="p-4 border rounded bg-light shadow"
          >
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                defaultValue={user.name}
                type="text"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                id="name"
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
                Address
              </label>
              <input
                defaultValue={user.address}
                type="text"
                className={`form-control ${errors.address ? "is-invalid" : ""}`}
                id="address"
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 10,
                    message: "Address must be at least 10 characters long",
                  },
                })}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address.message}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Update
            </button>
          </form>
          <div>
            <Changepassword />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
