import { createContext, useEffect, useState } from "react";
import { fetchCategories } from "../services/CategoryService.js";
import { fetchItems } from "../services/ItemService.js";

export const AppContext = createContext(null);

export const AppContextProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const [auth, setAuth] = useState({
    token: null,
    user: null,
  });

  const [items, setItems] = useState([]);

  const [cartItems, setCartItems] = useState([]);

  const addCart = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem.name === item.name
    );
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  }

  const removeFromCart = (itemName) => {
    setCartItems(cartItems.filter((item) => item.name !== itemName));
  };

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.itemId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    const loadData = async () => {
      if (localStorage.getItem("token") && localStorage.getItem("user")) {
        setAuthData(
          localStorage.getItem("token"),
          localStorage.getItem("user")
        );
        const response = await fetchCategories();
        const resp = await fetchItems();
        if (response.status === 200) {
          setCategories(response.data);
          setItems(resp.data);
        }
      }
    };
    loadData();
  }, []);

  const setAuthData = (token, user) => {
    setAuth({ token, user });
  };

  const contextValue = {
    categories,
    setCategories,
    auth,
    setAuthData,
    items,
    setItems,
    addCart,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
