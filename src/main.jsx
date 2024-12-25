import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import  CartProvider from "./Hooks/useCart";
import { AuthProvider } from "./Hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "./axiosconfig";
import { LoadingProvider } from "./Hooks/useLoading";
import "./Interceptors/AuthInterceptor";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <LoadingProvider>
      <AuthProvider>
        <CartProvider>
          <App />
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  </BrowserRouter>
);
