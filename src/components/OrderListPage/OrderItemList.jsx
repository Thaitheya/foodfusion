import React from "react";
import { Link } from "react-router-dom";
import { Price } from "../Price/Price";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderItemsList({ order }) {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-danger text-white">
          <h3 className="text-center mb-0">Your Order</h3>
        </div>
        <div className="card-body">
          <table className="table table-hover table-responsive-lg text-center">
            <thead className="thead-light">
              <tr>
                <th scope="col">Image</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
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
                        style={{ maxWidth: "120px", borderRadius: "10px" }}
                      />
                    </Link>
                  </td>
                  <td className="align-middle">{item.food.name}</td>
                  <td className="align-middle">
                    <Price price={item.food.price} />
                  </td>
                  <td className="align-middle">{item.quantity}</td>
                  <td className="align-middle">
                    <Price price={item.price} />
                  </td>
                </tr>
              ))}
              <tr className="table-active">
                <td colSpan="4" className="text-right font-weight-bold">
                  <h5>Total:</h5>
                </td>
                <td className="align-middle">
                  <h5>
                    <Price price={order.totalPrice} />
                  </h5>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
