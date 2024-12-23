import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Title from "../../components/Title/Title";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
const Register = () => {
    const auth = useAuth();
    const {user} = auth;
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const returnUrl = params.get('returnUrl');

    useEffect (()=> {
        if(!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/')
    },[user]);
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();
  const submit = async (data) => {
   await auth.register(data);
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <Title title="Register" />
              <form onSubmit={handleSubmit(submit)} noValidate>
                {/* Name Input */}
                <div className="mb-2">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className={`form-control form-control-sm ${
                      errors.name ? "is-invalid" : ""
                    }`}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 5,
                        message: "Name must be at least 5 characters long",
                      },
                    })}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">
                      {errors.name.message}
                    </div>
                  )}
                </div>

                {/* Email Input */}
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control form-control-sm ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>

                {/* Password Input */}
                <div className="mb-2">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control form-control-sm ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="mb-2">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className={`form-control form-control-sm ${
                      errors.confirmPassword ? "is-invalid" : ""
                    }`}
                    {...register("confirmPassword", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match",
                    })}
                  />
                  {errors.confirmPassword && (
                    <div className="invalid-feedback">
                      {errors.confirmPassword.message}
                    </div>
                  )}
                </div>

                {/* Address Input */}
                <div className="mb-2">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    className={`form-control form-control-sm ${
                      errors.address ? "is-invalid" : ""
                    }`}
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

                <button type="submit" className="btn btn-danger w-100 btn-sm">
                  Register
                </button>
                <div>
                  Already a fusioner? &nbsp;
                  <Link
                    to={`/login?${
                      returnUrl ? "returnUrl=" + returnUrl : ""
                    }`}
                  >
                    Login here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
