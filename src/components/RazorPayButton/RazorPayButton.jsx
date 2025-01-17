import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../Hooks/useCart";

const RazorPayButton = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/orders/newOrderForCurrentUser", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch the order.");
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);

      let currentOrder = order;

      if (!currentOrder) {
        const { data: newOrder } = await axios.post(
          "/api/orders/create",
          {
            items: currentOrder.cartItems,
            name: currentOrder.name,
            address: currentOrder.address,
          },
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          }
        );
        currentOrder = newOrder;
        setOrder(newOrder);
      }

      const options = {
        key: "rzp_test_pMRWrdCMj5F1lQ",
        amount: currentOrder.totalPrice * 100,
        currency: "INR",
        name: "Food Fusion",
        description: "Order transaction",
        order_id: currentOrder.order_id,
        handler: async (response) => {
          try {
            await axios.put(
              "/api/orders/pay",
              { paymentId: response.razorpay_payment_id },
              {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
              }
            );

            toast.success("Payment successful! Your order is confirmed.");
            clearCart();
            navigate(`/track/` + response.razorpay_payment_id);
          } catch (err) {
            console.error("Failed to update payment status:", err);
            toast.error("Failed to update payment status. Please contact support.");
          }
        },
        prefill: {
          name: currentOrder.name,
          email: currentOrder.email || "test@example.com",
          contact: currentOrder.contact || "9952462594",
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        toast.error(response.error.description || "Payment failed. Please try again.");
      });

      razorpay.open();
      setLoading(false);
    } catch (err) {
      console.error("Error initiating payment:", err);
      toast.error("Failed to initiate payment. Please try again.");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {order ? (
        <div>
          <button onClick={handlePayment} className="btn btn-primary">
            Pay Now
          </button>
        </div>
      ) : (
        <p>No pending orders.</p>
      )}
    </div>
  );
};

export default RazorPayButton;
