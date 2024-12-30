import React, { useEffect, useState } from "react";
import { getNewOrderForCurrentUser } from "../../services/OrderService";
import Title from "../../components/Title/Title";
import OrderItemsList from "../../components/OrderListPage/OrderItemList";
import RazorPayButton from "../../components/RazorPayButton/RazorPayButton";

const PaymentPage = () => {
  const [order, setOrder] = useState();

  useEffect(() => {
    getNewOrderForCurrentUser().then((data) => setOrder(data));
  }, []);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      {/* Order Card */}
      <div className="card shadow-lg border-0 rounded-lg">
        <div className="card-header bg-danger text-white text-center py-3">
          <Title title="Order Summary" fontSize="1.8rem" />
        </div>
        <div className="card-body">
          {/* Order Details */}
          <div className="mb-4">
            <h5 className="font-weight-bold">Name:</h5>
            <p className="text-muted">{order.name}</p>
          </div>
          <div className="mb-4">
            <h5 className="font-weight-bold">Address:</h5>
            <p className="text-muted">{order.address}</p>
          </div>
          <div className="mb-4">
            <h5 className="font-weight-bold">Total Amount:</h5>
            <p className="h5 font-weight-bold text-success">
              ₹{order.totalPrice}
            </p>
          </div>

          {/* Order Items
          <div className="border-top pt-3 mt-3">
            <OrderItemsList order={order} />
          </div> */}
        </div>
      </div>

      {/* Payment Section */}
      <div className="mt-4 text-center">
        <h4 className="mb-4">Proceed with Payment</h4>
        <RazorPayButton order={order} />
      </div>

      {/* Confirmation/Alert Section */}
      <div className="alert alert-info mt-4 text-center" role="alert">
        <strong>Important:</strong> Please ensure the order details are correct
        before proceeding with the payment.
      </div>
    </div>
  );
};

export default PaymentPage;
