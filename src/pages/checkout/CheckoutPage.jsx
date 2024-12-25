import React, { useState } from "react";
import { useAuth } from "../../Hooks/useAuth";
import { useCart } from "../../Hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { createOrder } from "../../services/OrderService";
import { toast } from "react-toastify";
import OrderItemsList from "../../components/OrderListPage/OrderItemList";

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [order, setOrder] = useState({ ...cart });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const submit = async (data) => {
    try {
      await createOrder({ ...order, name: data.name, address: data.address });
      toast.success("Order created successfully!");
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
        className="shadow-sm p-3 rounded border text-center"
      >
        <h4 className="mb-3">Order Form</h4>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control form-control-sm ${
              errors.name ? "is-invalid" : ""
            }`}
            placeholder="Name"
            defaultValue={user.name}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <div className="invalid-feedback text-start">
              {errors.name.message}
            </div>
          )}
        </div>
        <div className="mb-3">
          <input
            type="text"
            className={`form-control form-control-sm ${
              errors.address ? "is-invalid" : ""
            }`}
            placeholder="Address"
            defaultValue={user.address}
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <div className="invalid-feedback text-start">
              {errors.address.message}
            </div>
          )}
        </div>
        <div className="mb-3 text-start">
          <h6 className="fw-bold">Order Items:</h6>
          <OrderItemsList order={order} />
        </div>
        <button type="submit" className="btn btn-danger btn-sm w-100">
          Go to Payment
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
