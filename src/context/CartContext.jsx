import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("vk_cart");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Failed to load cart:", error);
      return [];
    }
  });

  // Save cart whenever it changes
  useEffect(() => {
    localStorage.setItem("vk_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ADD TO CART
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existing = currentItems.find(
        (item) => item._id === product._id
      );

      if (existing) {
        // Don't exceed available stock
        if (
          product.stock &&
          existing.quantity >= product.stock
        ) {
          return currentItems;
        }

        return currentItems.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) => {
        if (item._id !== id) {
          return item;
        }

        const maxStock = item.stock || 999;

        if (item.quantity >= maxStock) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      })
    );
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) => {
          if (item._id !== id) {
            return item;
          }

          return {
            ...item,
            quantity: item.quantity - 1,
          };
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // REMOVE ITEM
  const removeFromCart = (id) => {
    setCartItems((items) =>
      items.filter((item) => item._id !== id)
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCartItems([]);
  };

  // TOTAL NUMBER OF ITEMS
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // TOTAL PRICE
  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}