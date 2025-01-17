import React from "react";
import { useCart } from "../../Hooks/useCart";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, handleQuantityChange, removeFromCart } = useCart();

  return (
    <>
      {/* Breadcrumb Navigation */}
      <nav
  style={{ "--bs-breadcrumb-divider": "'>'" }}
  aria-label="breadcrumb"
  className="bg-light py-2 mb-4"
>
  <div className="container">
    <ol className="breadcrumb mb-0">
      <li className="breadcrumb-item">
        <Link to="/">Home</Link>
      </li>
      <li className="breadcrumb-item active" aria-current="page">
        My Cart
      </li>
    </ol>
  </div>
</nav>


      {/* Main Content */}
      <div className="container">
        <Title title="My Cart" margin="1.5rem 0 0 0" />

        <div className="row gy-4 mt-4">
          {/* Cart Items Section */}
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body">
                {cart.items.length > 0 ? (
                  <table className="table table-hover align-middle">
                    <thead className="table-light">
                      <tr>
                        <th scope="col"></th>
                        <th scope="col">Name</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Price</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.items.map((item) => (
                        <tr key={item.food.id}>
                          <td>
                            <img
                              src={item.food.imageUrl}
                              alt={item.food.name}
                              className="img-thumbnail"
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                              }}
                            />
                          </td>
                          <td>
                            <span className="fw-medium">{item.food.name}</span>
                          </td>
                          <td>
                            <select
                              className="form-select form-select-sm"
                              value={item.quantity}
                              onChange={(e) =>
                                handleQuantityChange(
                                  item,
                                  parseInt(e.target.value)
                                )
                              }
                              style={{ width: "80px" }}
                            >
                              {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                  {num + 1}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            ₹
                            <span>
                              {(item.food.price * item.quantity).toFixed(2)}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => removeFromCart(item.food.id)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-5">
                    <h4 className="text-muted">Your cart is empty!</h4>
                    <p className="text-muted">
                      Add some items to your cart to view them here.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cart Summary Section */}
          <div className="col-lg-4">
            <div className="card shadow-sm sticky-top" style={{ top: "1rem" }}>
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <p className="card-text mb-2">
                  <strong>Total Items:</strong> {cart.totalCount}
                </p>
                <p className="card-text mb-3">
                  <strong>Total Price:</strong> ₹{cart.totalPrice.toFixed(2)}
                </p>
                <Link to="/checkout" className="btn btn-primary w-100">
                  Proceed To Checkout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
