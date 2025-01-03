import React, { useState, useEffect } from "react";
import { useCart } from "../../hooks/useCart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { createOrder } from "../../services/OrderService";
import OrderItemsList from "../../components/OrderListPage/OrderItemList";
import RazorPayButton from "../../components/RazorPayButton/RazorPayButton"; // Import RazorPayButton

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
      // Create order with the given user info and cart
      const createdOrder = await createOrder({ ...order, name: data.name, address: data.address });
      toast.success("Order created successfully!");
      // Update order state with the newly created order details
      setOrder(createdOrder);
      navigate("/payment");
    } catch (error) {
      toast.error("Failed to create order. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <form
        onSubmit={handleSubmit(submit)}
        className="border p-4 shadow-sm rounded"
      >
        <h3 className="text-center mb-4">Order Form</h3>

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

        <div className="mb-4">
          <OrderItemsList order={order} />
        </div>

        <button type="submit" className="btn btn-primary w-100 mt-3">
          Go to Payment
        </button>
      </form>
    </div>
  );
}
