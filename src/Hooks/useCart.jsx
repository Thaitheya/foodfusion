import React, { createContext, useContext, useState, useEffect } from "react";


const CartContext = createContext(null);
const CART_KEY = "cart";
const EMPTY_CART = {
  items: [],
  totalPrice: 0,
  totalCount: 0,
};

const CartProvider = ({ children }) => {
  const { items, totalPrice, totalCount } = getCartFromLocalStorage();
  const [cartItems, setCartItems] = useState(items);
  const [currentTotalPrice, setTotalPrice] = useState(totalPrice);
  const [currentTotalCount, setTotalCount] = useState(totalCount);

  useEffect(() => {
    const updatedTotalPrice = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
    const updatedTotalCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    setTotalPrice(updatedTotalPrice);
    setTotalCount(updatedTotalCount);

    localStorage.setItem(
      CART_KEY,
      JSON.stringify({
        items: cartItems,
        totalPrice: updatedTotalPrice,
        totalCount: updatedTotalCount,
      })
    );
  }, [cartItems]);

  const addToCart = (food) => {
    const cartItem = cartItems.find((item) => item.food.id === food.id);
    if (cartItem) {
      handleQuantityChange(cartItem, cartItem.quantity);
    } else {
      setCartItems([...cartItems, { food, quantity: 1, price: food.price }]);
    }
  };

  const removeFromCart = (foodId) => {
    const updatedCartItems = cartItems.filter(
      (item) => item.food.id !== foodId
    );
    setCartItems(updatedCartItems);
  };

  const handleQuantityChange = (cartItem, newQuantity) => {
    const { food } = cartItem;

    if (newQuantity <= 0) {
      removeFromCart(food.id);
      return;
    }

    const updatedCartItem = {
      ...cartItem,
      quantity: newQuantity,
      price: food.price,
    };

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.food.id === food.id ? updatedCartItem : item
      )
    );
  };

  function getCartFromLocalStorage() {
    const storedCart = localStorage.getItem(CART_KEY);
    return storedCart ? JSON.parse(storedCart) : EMPTY_CART;
  }

  const clearCart = ()=> {
    sessionStorage.removeItem(CART_KEY)
    const {items, totalPrice, totalCount } = EMPTY_CART;
    setCartItems(items);
    setTotalCount(totalCount);
    setTotalPrice(totalPrice);
  }

  return (
    <CartContext.Provider
      value={{
        cart: {
          items: cartItems,
          totalPrice: currentTotalPrice,
          totalCount: currentTotalCount,
        },
        addToCart,
        removeFromCart,
        handleQuantityChange,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartContext);
