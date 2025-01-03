import React from "react";
import { useCart } from "../../Hooks/useCart";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
const CartPage = () => {
  const { cart, handleQuantityChange, removeFromCart } = useCart();

  return (
    <div className="container py-4">
      <Title title="Cart Page" margin="1.5rem 0 0 0" />

      <div className="row">
        {/* Cart Items Section */}
        <div className="col-lg-8">
          {cart.items.length > 0 ? (
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th scope="col">Image</th>
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
                        src={`${item.food.imageUrl}`}
                        alt={item.food.name}
                        className="img-thumbnail"
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </td>
                    <td>
                      <a className="text-decoration-none text-dark">
                        {item.food.name}
                      </a>
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(item, parseInt(e.target.value))
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
                    <td>₹{(item.food.price * item.quantity).toFixed(2)}</td>
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
              <h4>Your cart is empty!</h4>
              <p>Add some items to your cart to view them here.</p>
            </div>
          )}
        </div>
        <div className="col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Cart Summary</h5>
              <p className="card-text">
                <strong>Count:</strong> {cart.totalCount}
              </p>
              <p className="card-text">
                <strong>Price:</strong> ₹{cart.totalPrice.toFixed(2)}
              </p>
              <button className="btn btn-primary w-100">
                <Link
                  to="/checkout"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Proceed To Checkout
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
