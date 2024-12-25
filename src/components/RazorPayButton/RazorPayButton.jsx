import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentPage = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the current user's new order
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
      alert("No order available to process payment.");
      return;
    }

    try {
      setLoading(true);

      const { data: razorpayOrder } = await axios.post(
        "/api/orders/create",
        {
          ...order,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const options = {
        key: "rzp_test_SvKyH3a2rHiOKu",
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Food Fusion",
        description: "Order transaction",
        order_id: razorpayOrder._id,
        handler: async (response) => {
          try {
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            const { data: verifiedOrder } = await axios.post(
              "/api/orders/verify-payment",
              verificationData,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );

            alert("Payment successful!");
            console.log("Verified Order:", verifiedOrder);
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed.");
          }
        },
        prefill: {
          name: order.name,
          email: "user@example.com", // Replace with the user's email
          contact: "9999999999", // Replace with the user's contact
        },
        theme: {
          color: "#F37254",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (err) {
      console.error("Error initiating payment:", err);
      alert("Failed to initiate payment.");
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {order ? (
        <div>
          <button onClick={handlePayment} className="btn btn-danger">Pay Now</button>
        </div>
      ) : (
        <p>No pending orders.</p>
      )}
    </div>
  );
};

export default PaymentPage;
