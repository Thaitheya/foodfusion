import React, { useEffect, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import { getAll, getAllStatus } from "../../services/OrderService";
import Title from "../../components/Title/Title";
import { Price } from "../../components/Price/Price";

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "ORDER_FETCHED":
      return { ...state, orders: payload, loading: false };
    case "ALL_STATUS_FETCHED":
      return { ...state, allStatus: payload, loading: false };
    case "LOADING":
      return { ...state, loading: true };
    default:
      return state;
  }
};

const initialState = { orders: [], allStatus: [], loading: false };

const OrderPage = () => {
  const [{ allStatus, orders, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const { filter } = useParams();

  useEffect(() => {
    dispatch({ type: "LOADING" });
    getAllStatus().then((status) => {
      dispatch({ type: "ALL_STATUS_FETCHED", payload: status });
    });
    getAll(filter).then((orders) => {
      dispatch({ type: "ORDER_FETCHED", payload: orders });
    });
  }, [filter]);

  // Function to format the date into a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="container mt-4">
      <Title title="Orders" fontSize="2rem" />

      {/* Filter Links */}
      {allStatus.length > 0 && (
        <div className="d-flex flex-wrap my-3">
          {allStatus.map((state) => (
            <Link
              key={state}
              className={`btn me-2 ${
                state === filter ? "btn-primary" : "btn-outline-primary"
              }`}
              to={`/orders/${state}`}
            >
              {state}
            </Link>
          ))}
        </div>
      )}
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row mt-4">
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <div key={order.id} className="col-md-6 col-lg-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title mb-0">Order ID: {order.id}</h5>
                      <span
                        className={`badge ${
                          order.status === "DELIVERED"
                            ? "bg-success"
                            : order.status === "CANCELLED"
                            ? "bg-danger"
                            : "bg-warning"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    <p className="text-muted mt-2">
                      <strong>Order placed on:</strong>{" "}
                      {formatDate(order.createdAt)}
                    </p>

                    <div className="accordion" id={`accordion-${order.id}`}>
                      <div className="accordion-item">
                        <h2
                          className="accordion-header"
                          id={`heading-${order.id}`}
                        >
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapse-${order.id}`}
                            aria-expanded="false"
                            aria-controls={`collapse-${order.id}`}
                          >
                            View Order Details
                          </button>
                        </h2>
                        <div
                          id={`collapse-${order.id}`}
                          className="accordion-collapse collapse"
                          aria-labelledby={`heading-${order.id}`}
                          data-bs-parent={`#accordion-${order.id}`}
                        >
                          <div className="accordion-body">
                            <ul className="list-group mb-3">
                              {order.items.map((item, idx) => (
                                <li
                                  key={idx}
                                  className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                  <Link to={`/food/${item.food.id}`}>
                                    <img
                                      src={item.food.imageUrl}
                                      alt={item.food.name}
                                      className="rounded me-2"
                                      style={{ width: "50px", height: "50px" }}
                                    />
                                  </Link>
                                  {item.food.name}
                                  <span className="badge bg-primary rounded-pill">
                                    Qty: {item.quantity}
                                  </span>
                                </li>
                              ))}
                            </ul>
                            <div className="text-end">
                              <strong>
                                <Price price={order.totalPrice} />
                              </strong>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">No orders found.</p>
              <Link to="/menu" className="btn btn-primary">
                Browse Menu
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderPage;
