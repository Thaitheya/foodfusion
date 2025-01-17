import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import FoodPage from "./pages/Food/FoodPage";
import CartPage from "./pages/cart/CartPage";
import LoginPage from "./pages/Login/LoginPage";
import Register from "./pages/Register/Register";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import { AuthRoute } from "./components/AuthRoute/AuthRoute";
import PaymentPage from "./pages/Payment/PaymentPage";
import Profile from "./pages/profile/Profile";
import OrderPage from "./pages/orders/OrderPage";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminRoute from "./components/AdminRoute/AdminRoute";
import AdminPage from "./pages/AdminPage/AdminPage";
import FoodEditPage from "./pages/FoodEdit/FoodEditPage";
import OrderTrackPage from "./pages/OrderTrackPage/OrderTrackPage";
import { useAuth } from "./Hooks/useAuth";

const AppRoutes = () => {
  const user = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="/foods/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      {
        user.admin && <Route path="/admin/dashboard" element={<Dashboard />} />
      }
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/checkout"
        element={
          <AuthRoute>
            <CheckoutPage />
          </AuthRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <AuthRoute>
            <PaymentPage />
          </AuthRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <AuthRoute>
            <Profile />
          </AuthRoute>
        }
      />
      <Route
        path="/orders/:filter?"
        element={
          <AuthRoute>
           <OrderPage />
          </AuthRoute>
        }
      />
       <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
           <OrderTrackPage />
          </AuthRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
      />
      <Route
        path="/admin/foods/:searchTerm?"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/addFood"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/editFood/:foodId"
        element={
          <AdminRoute>
            <FoodEditPage />
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
