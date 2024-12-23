import React from "react";
import { useLoading } from "../../Hooks/useLoading";
import "bootstrap/dist/css/bootstrap.min.css";

export const Loading = () => {
  const { isLoading } = useLoading();
  if (!isLoading) return null; // return null when not loading instead of undefined

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
        </div>
      </div>
    </div>
  );
};
