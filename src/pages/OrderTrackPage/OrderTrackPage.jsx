import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { trackOrderById } from "../../services/OrderService"; // Assuming this is your service
import NotFound from "../../components/Not Found/NotFound"; // Your custom NotFound component
import DateTime from "../../components/DateTime/DateTime"; // Your DateTime component
import OrderItemsList from "../../components/OrderListPage/OrderItemList"; // Component to show order items

export default function OrderTrackPage() {
  const { orderId } = useParams(); 
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      trackOrderById(orderId)
        .then((orderData) => {
          setOrder(orderData);
        })
        .catch(() => {
          setOrder(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [orderId]);

  useEffect(() => {
    if (countdown === 0) {
      navigate("/orders");
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  if (!orderId) return <NotFound message="Order Not Found" linkText="Go To Home Page" />;
  if (loading) return <p>Loading...</p>;
  if (!order) return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

  return (
    <div className="container mt-5">
      <div className="row">
        {/* Order Details Section */}
        {order.status === "PAYED" && (
            <div className="text-center">
              <p className="text-success">Your payment is successful!</p>
              <p>Redirecting to view all orders in {countdown} seconds...</p>
            </div>
          )}
        <div className="col-md-8 mb-4">
          <h1 className="mb-4">Order #{order.id}</h1>

          <div className="card p-4 mb-4">
            <div className="row">
              {/* Order Date */}
              <div className="col-md-6 mb-3">
                <strong>Date:</strong> <DateTime date={order.createdAt} />
              </div>
              {/* Order Name */}
              <div className="col-md-6 mb-3">
                <strong>Name:</strong> {order.name}
              </div>
              <div className="col-md-6 mb-3">
                <strong>Address:</strong> {order.address}
              </div>
              <div className="col-md-6 mb-3">
                <strong>Status:</strong> {order.status}
              </div>
              {order.paymentId && (
                <div className="col-md-6 mb-3">
                  <strong>Payment ID:</strong> {order.paymentId}
                </div>
              )}
            </div>
          </div>

          {/* Order Items List */}
          <div className="mb-4">
            <OrderItemsList order={order} />
          </div>
        </div>
      </div>
    </div>
  );
}
