import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import Title from "../../components/Title/Title";
import foodImage from "../../../public/foods/food-8.jpg"; // Assuming you have a food image in assets

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { user, login, error } = useAuth();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (user) {
      returnUrl ? navigate(returnUrl) : navigate("/");
    }
  }, [user, navigate, returnUrl]);

  const submit = async ({ email, password }) => {
    setLoading(true);
    try {
      await login(email, password);
    } catch (err) {
      // Handle error if login fails
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Left Column - Food Image */}
        <div className="col-md-6 col-lg-4 d-none d-lg-block">
          <img
            src={foodImage}
            alt="Food"
            className="img-fluid"
            style={styles.image}
          />
        </div>

        {/* Right Column - Login Form */}
        <div className="col-md-6 col-lg-4">
          <div className="card shadow">
            <div className="card-body">
              <Title title="Login" />
              <form onSubmit={handleSubmit(submit)} noValidate>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${
                      errors.email ? "is-invalid" : ""
                    }`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <div className="invalid-feedback">
                      {errors.email.message}
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">
                      {errors.password.message}
                    </div>
                  )}
                </div>
                {error && <div className="alert alert-danger">{error}</div>}{" "}
                {/* Display error from login */}
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <div className="mt-3">
                  New to fusion? &nbsp;
                  <Link
                    to={`/register${
                      returnUrl ? `?returnUrl=${returnUrl}` : ""
                    }`}
                  >
                    Register here
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

// Styles for layout and image
const styles = {
  image: {
    borderRadius: "8px",
    objectFit: "cover",
    height: "100%",
  },
};

export default LoginPage;
