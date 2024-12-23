import React from "react";
import { Link } from "react-router-dom";

const NotFound = ({
  message = "Oops! Page not found.",
  linkRoute = "/",
  linkText = "Return to Home",
}) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
      }}
    >
      <div className="text-center">
        <h1
          className="display-1 fw-bold text-primary"
          style={{ fontSize: "6rem" }}
        >
          404
        </h1>
        <p className="fs-4 text-muted">{message}</p>
        <Link to={linkRoute} className="btn btn-outline-primary btn-lg mt-4">
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
