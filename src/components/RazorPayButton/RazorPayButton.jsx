import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const RazorPayButton = () => {
  const navigate = useNavigate();
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
    if (!order) {
      toast.error("No order available to process payment.");
      return;
    }

    try {
      setLoading(true);

      const { data: razorpayOrder } = await axios.post(
        "/api/orders/create",
        { ...order, totalPrice: order.totalPrice },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );

      const options = {
        key: "rzp_test_pMRWrdCMj5F1lQ",
        amount: razorpayOrder.totalPrice * 100,
        currency: "INR",
        name: "Food Fusion",
        description: "Order transaction",
        order_id: razorpayOrder.razorpay_order_id,
        handler: async (response) => {
          try {
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            await axios.post("/api/orders/verify-payment", verificationData, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });

            toast.success("Payment successful! Your order is confirmed.");
          } catch (err) {
            console.error("Payment verification failed:", err);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: order.name,
          email: order.email || "test@example.com",
          contact: order.contact || "9952462594",
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
      navigate("/orders");
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
