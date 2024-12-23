import axios from "axios";
import { toast } from "react-toastify";
export const createOrder = async (order) => {
  try {
    const { data } = axios.post("/api/orders/create", order);
    return data;
  } catch (error) {
    toast.error(error, "Failed to process order.");
    throw error;
  }
};

export const getNewOrderForCurrentUser = async () => {
  const { data } = await axios.get("/api/orders/newOrderForCurrentUser");
  return data;
};

export const placeOrder = async (order) => {
  try {
    const { data } = await axios.post("/api/orders/payment", order);
    return data;
  } catch (e) {
    toast.error(e.response.data.message);
    throw e;
  }
};


