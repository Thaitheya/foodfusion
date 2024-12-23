import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";
import { useAuth } from "../../Hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth()

  const {cart} = useCart();
  return (
    <header className="bg-danger border-bottom">
      <div className="container d-flex justify-content-between align-items-center py-2">
        <Link to="/" className="navbar-brand fw-bold text-white">
          Food Fusion
        </Link>
        <nav>
          <ul className="nav">
            {user ? (
              <li className="nav-item dropdown">
                <Link
                  to="/profile"
                  className="nav-link dropdown-toggle text-white"
                  id="userMenu"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {user.name}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="userMenu">
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/orders" className="dropdown-item">
                      Orders
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="dropdown-item text-danger"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/login" className="nav-link text-white">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link
                to="/cart"
                className="nav-link position-relative text-white"
              >
                Cart
                {cart.totalCount > 0 && (
                  <span className="badge bg-danger rounded-pill position-absolute top-2 start-100 translate-middle">
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
