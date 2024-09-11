import { createContext, useContext, useState } from "react";

// Create context
const CartContext = createContext();

// Create a provider component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

// CartContext file
const addToCart = (item) => {
  // Assume item contains 'harga' and 'quantity'
  const newItem = {
      ...item,
      total: item.harga * item.quantity // Ensure total is calculated here
  };

  setCartItems([...cartItems, newItem]);
  setIsCartModalOpen(true);
};


  const closeCartModal = () => {
    setIsCartModalOpen(false);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, isCartModalOpen, closeCartModal }}>
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
