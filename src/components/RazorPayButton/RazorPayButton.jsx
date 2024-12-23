import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RazorpayButton = ({ order }) => {
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("/api/orders/payment", { orderId: order._id });

      const options = {
        key: data.key,
        amount: order.totalPrice * 100,
        currency: "INR",
        name: "Your Business Name",
        description: "Test Transaction",
        order_id: data.razorpayOrderId,
        handler: async (response) => {
          const verificationResponse = await axios.post("/api/orders/verify", {
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            orderId: order._id,
          });

          if (verificationResponse.data.success) {
            toast.success("Payment successful!");
          } else {
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: order.name,
          email: order.email, // Replace with user email
          contact: "9999999999", // Replace with user contact
        },
        theme: {
          color: "#F37254",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
      toast.error("An error occurred during payment.");
    }
  };

  return <button onClick={handlePayment}>Pay ₹{order.totalPrice}</button>;
};

export default RazorpayButton;
