import React from "react";
import { Link } from "react-router-dom";
import { Price } from "../Price/Price";

export default function OrderItemsList({ order }) {
  return (
    <div className="table-responsive mt-3">
      <h4 className="mb-3">Order Items</h4>
      <table className="table table-bordered align-middle">
        <thead className="table-light">
          <tr>
            <th></th>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.food.id}>
              <td>
                <Link to={`/food/${item.food.id}`}>
                  <img
                    src={item.food.imageUrl}
                    alt={item.food.name}
                    className="img-thumbnail"
                    style={{ width: "80px", height: "80px", objectFit: "cover" }}
                  />
                </Link>
              </td>
              <td>{item.food.name}</td>
              <td>₹{item.food.price}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price}</td>
            </tr>
          ))}
          <tr>
            <td colSpan="4" className="text-end fw-bold">
              Total:
            </td>
            <td>
              <Price price={order.totalPrice} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}