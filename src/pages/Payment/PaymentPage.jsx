import React, { useEffect, useState } from "react";
import { getNewOrderForCurrentUser } from "../../services/OrderService";
import Title from "../../components/Title/Title";
import OrderItemsList from "../../components/OrderListPage/OrderItemList";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentPage = () => {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg p-4 rounded">
            <Title title="Order Summary" fontSize="1.6rem" />
            <div className="mb-3">
              <h5 className="fw-bold">Customer Details</h5>
              <div className="d-flex mb-2">
                <strong className="me-2">Name:</strong>
                <span>{order.name}</span>
              </div>
              <div className="d-flex">
                <strong className="me-2">Address:</strong>
                <span>{order.address}</span>
              </div>
            </div>
            <div className="mt-4">
              <OrderItemsList order={order} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
