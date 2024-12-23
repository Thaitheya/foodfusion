import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../../Hooks/useAuth";

const CreateOrderPage = () => {
  const [items, setItems] = useState([]);
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
   useEffect(() => {
     if (user) {
       setValue("name", user.name || "");
       setValue("email", user.email || "");
       setValue("totalprice", user.totalPrice || "");
     }
   }, [user, setValue]);
  const onSubmit = async (data) => {
    try {
      const orderData = {
        name: data.name,
        address: data.address,
        totalPrice: data.totalPrice,
        items: items.map((item) => ({
          food: item.foodId,
          price: item.price,
          quantity: item.quantity,
        })),
      };

      const response = await axios.post("/api/orders/create", orderData);
      toast.success("Order created successfully!");
      reset();
      setItems([]);
    } catch (error) {
      toast.error("Failed to create order. Please try again.");
      console.error("Error creating order:", error);
    }
  };
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  return (
    <div className="container mt-5">
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div className="form-group mb-3">
          <label>Name</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name.message}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Address</label>
          <textarea
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
            {...register("address", { required: "Address is required" })}
          />
          {errors.address && (
            <div className="invalid-feedback">{errors.address.message}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Total Price</label>
          <input
            type="number"
            className={`form-control ${errors.totalPrice ? "is-invalid" : ""}`}
            {...register("totalPrice", {
              required: "Total price is required",
              min: 1,
            })}
          />
          {errors.totalPrice && (
            <div className="invalid-feedback">{errors.totalPrice.message}</div>
          )}
        </div>

        <h4>Items</h4>
        {items.map((item, index) => (
          <div key={index} className="mb-3">
            <div className="row">
              <div className="col-md-4">
                <label>Food ID</label>
                <input
                  type="text"
                  className="form-control"
                  value={item.foodId}
                  onChange={(e) =>
                    handleItemChange(index, "foodId", e.target.value)
                  }
                />
              </div>
              <div className="col-md-4">
                <label>Price</label>
                <input
                  type="number"
                  className="form-control"
                  value={item.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", parseFloat(e.target.value))
                  }
                />
              </div>
              <div className="col-md-4">
                <label>Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  onChange={(e) =>
                    handleItemChange(
                      index,
                      "quantity",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrderPage;
