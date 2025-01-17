import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrder } from "../../services/OrderService";
import OrderItemsList from "../../components/OrderListPage/OrderItemList";
import { useCart } from "../../Hooks/useCart";
import { useAuth } from "../../Hooks/useAuth";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });

  useEffect(() => {
    setOrder({ ...cart });
  }, [cart]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    try {
      const createdOrder = await createOrder({
        ...order,
        name: data.name,
        address: data.address,
      });
      toast.success("Order created successfully!");
      setOrder(createdOrder);
      navigate("/payment");
    } catch (error) {
      toast.error("Failed to create order. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "#f8f9fa",
        overflow: "hidden",
      }}
    >
      <form
        onSubmit={handleSubmit(submit)}
        className="border p-4 shadow-sm rounded"
        style={{
          maxWidth: "600px",
          width: "100%",
          background: "#fff",
        }}
      >
        <h3 className="text-center mb-4 text-primary">Order Form</h3>

        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            defaultValue={user.name}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        {/* Address Field */}
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            id="address"
            type="text"
            defaultValue={user.address}
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address.message}</div>
          )}
        </div>

        {/* Order Items */}
        <div className="mb-4" style={{ maxHeight: "200px", overflowY: "auto" }}>
          <OrderItemsList order={order} />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          style={{
            padding: "0.75rem",
            fontWeight: "bold",
          }}
        >
          Go to Payment
        </button>
      </form>
    </div>
  );
}
