import React from "react";
import { Link } from "react-router-dom";
import { Price } from "../Price/Price";
import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderItemsList({ order }) {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0 rounded-3">
        {/* Card Header */}
        <div className="card-header bg-primary text-white text-center py-3">
          <h4 className="mb-0">Your Order Summary</h4>
        </div>

        {/* Card Body */}
        <div className="card-body px-4 py-3">
          <table className="table table-hover align-middle">
            {/* Table Header */}
            <thead className="table-light">
              <tr>
                <th scope="col" className="text-center">
                  Image
                </th>
                <th scope="col">Name</th>
                <th scope="col" className="text-center">
                  Qty
                </th>
                <th scope="col" className="text-end">
                  Price
                </th>
                <th scope="col" className="text-end">
                  Subtotal
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {order.items.map((item) => (
                <tr key={item.food.id}>
                  <td className="text-center">
                    <Link to={`/food/${item.food.id}`}>
                      <img
                        src={item.food.imageUrl}
                        alt={item.food.name}
                        className="img-fluid rounded"
                        style={{
                          maxWidth: "60px",
                          height: "auto",
                          objectFit: "cover",
                        }}
                      />
                    </Link>
                  </td>
                  <td>{item.food.name}</td>
                  <td className="text-center">{item.quantity}</td>
                  <td className="text-end">
                    <Price price={item.food.price} />
                  </td>
                  <td className="text-end">
                    <Price price={item.price} />
                  </td>
                </tr>
              ))}
            </tbody>

            {/* Table Footer */}
            <tfoot>
              <tr>
                <td colSpan="4" className="text-end fw-bold fs-5">
                  Total:
                </td>
                <td className="text-end fw-bold fs-5">
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
