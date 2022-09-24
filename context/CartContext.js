import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({
  cart: [],
  total: 0,
  setCart: () => {},
  deleteHandler: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvidor({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart items from database
  useEffect(() => {
    fetch('http://localhost:3000/api/cart')
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }, []);

  // Set total price for cart
  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + curr.total, 0));
  }, [cart]);

  // Delete from cart
  const deleteHandler = (id) => {
    // Delete from UI
    setCart(cart.filter((item) => item._id !== id));
    // Delete from Database - send delete request
    fetch('http://localhost:3000/api/cart', {
      method: 'DELETE',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const context = { cart, setCart, deleteHandler, total };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
