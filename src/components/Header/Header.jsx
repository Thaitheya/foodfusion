import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";
import { useAuth } from "../../Hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();

  return (
    <header className="bg-light shadow-sm border-bottom">
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Logo */}
        <Link to="/" className="navbar-brand fw-bold text-primary">
          Food Fusion
        </Link>

        {/* Navigation */}
        <nav>
          <ul className="nav align-items-center">
            {user ? (
              <li className="nav-item dropdown">
                <Link
                  to="#"
                  className="nav-link dropdown-toggle text-dark fw-medium"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle me-2"></i> {user.name}
                </Link>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow-sm"
                  aria-labelledby="userMenu"
                >
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      <i className="bi bi-person me-2"></i> Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="dropdown-item">
                      <i className="bi bi-list-check me-2"></i> Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="dropdown-item text-danger"
                    >
                      <i className="bi bi-box-arrow-right me-2"></i> Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link text-dark fw-medium">
                  <i className="bi bi-box-arrow-in-right me-2"></i> Login
                </Link>
              </li>
            )}
            <li className="nav-item ms-3">
              <Link
                to="/cart"
                className="nav-link text-dark position-relative fw-medium"
              >
                <i className="bi bi-cart me-1"></i> Cart
                {cart.totalCount > 0 && (
                  <span
                    className="badge bg-primary rounded-pill position-absolute top-0 start-100 translate-middle"
                    style={{ fontSize: "0.75rem", padding: "0.3rem 0.5rem" }}
                  >
                    {cart.totalCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
