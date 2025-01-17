import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../components/Title/Title";
import OrderItemsList from "../../components/OrderListPage/OrderItemList";
import RazorPayButton from "../../components/RazorPayButton/RazorPayButton";
import { getNewOrderForCurrentUser } from "../../services/OrderService";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";

const PaymentPage = () => {
  const [order, setOrder] = useState(null);
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getNewOrderForCurrentUser();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, []);

  if (!order)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-danger" role="status"></div>
        <p className="mt-3">Fetching your order details...</p>
      </div>
    );

  return (
    <>
      <nav
        style={{ "--bs-breadcrumb-divider": "'>'" }}
        aria-label="breadcrumb"
        className="bg-light py-2 mb-4"
      >
        <div className="container">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/checkout">Checkout</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
            Order Summary
            </li>
          </ol>
        </div>
      </nav>
      <div className="container mt-5">
        <div className="card shadow-lg border-0 rounded-lg overflow-hidden">
          <div className="card-header bg-primary text-white text-center py-4">
            <Title title="Order Summary" fontSize="2rem" />
            <p className="mb-0">Review your order details before proceeding</p>
          </div>
          <div className="card-body px-4 py-5">
            <div className="mb-4 d-flex align-items-center">
              <FaUser className="text-primary mr-3" size={24} />
              <div className="d-flex flex-row gap-3">
                <h5 className="font-weight-bold mb-1">Name:</h5>
                <p className="text-muted mb-0">{order.name}</p>
              </div>
            </div>

            <div className="mb-4 d-flex align-items-center">
              <FaMapMarkerAlt className="text-primary mr-3" size={24} />
              <div className="d-flex flex-row gap-3">
                <h5 className="font-weight-bold mb-1">Address:</h5>
                <p className="text-muted mb-0">{order.address}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <OrderItemsList order={order} />
        </div>
        <div className="mt-4 text-center">
          <RazorPayButton order={order} />
        </div>
        <div
          className="alert alert-info mt-5 text-center shadow-sm rounded-lg"
          role="alert"
        >
          <strong>Important:</strong> Please ensure the order details are
          accurate before making the payment. For any issues, contact our
          support team.
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
