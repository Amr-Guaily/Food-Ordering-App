import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext({
  cart: [],
  setCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export function CartProvidor({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/cart')
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
      });
  }, []);

  const context = { cart, setCart };
  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}
