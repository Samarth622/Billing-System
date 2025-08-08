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
  };

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
      if (auth.token && auth.user) {
        try {
          const [categoriesResponse, itemsResponse] = await Promise.all([
            fetchCategories(),
            fetchItems(),
          ]);

          if (categoriesResponse.status === 200) {
            setCategories(categoriesResponse.data);
          }
          if (itemsResponse.status === 200) {
            setItems(itemsResponse.data);
          }
        } catch (error) {
          console.error("Error loading data:", error);
        }
      }
    };

    loadData();
  }, [auth.token, auth.user]);

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
    clearCart,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};
