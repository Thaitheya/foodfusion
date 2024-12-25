import React from "react";
import { Link } from "react-router-dom";
import { Price } from "../Price/Price";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderItemsList({ order }) {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm border-0">
        <div className="card-header bg-danger text-white text-center">
          <h5 className="mb-0">Your Order</h5>
        </div>
        <div className="card-body p-2">
          <table className="table table-sm text-center">
            <thead className="table-light">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Qty</th>
                <th scope="col">Price</th>
                <th scope="col">Subtotal</th>
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
                        style={{ maxWidth: "60px", borderRadius: "5px" }}
                      />
                    </Link>
                  </td>
                  <td className="align-middle">{item.food.name}</td>
                  <td className="align-middle">{item.quantity}</td>
                  <td className="align-middle">
                    <Price price={item.food.price} />
                  </td>
                  <td className="align-middle">
                    <Price price={item.price} />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="table-active">
                <td colSpan="4" className="text-end fw-bold">
                  Total:
                </td>
                <td className="text-end">
                  <Price price={order.totalPrice} />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
