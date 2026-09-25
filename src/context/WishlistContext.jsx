import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist =
        localStorage.getItem("vk_wishlist");

      return savedWishlist
        ? JSON.parse(savedWishlist)
        : [];
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );

      return [];
    }
  });

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem(
      "vk_wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add product to wishlist
  const addToWishlist = (product) => {
    setWishlist((items) => {
      const exists = items.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return items;
      }

      return [...items, product];
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (id) => {
    setWishlist((items) =>
      items.filter(
        (item) => item._id !== id
      )
    );
  };

  // Add / remove product
  const toggleWishlist = (product) => {
    setWishlist((items) => {
      const exists = items.some(
        (item) => item._id === product._id
      );

      if (exists) {
        return items.filter(
          (item) => item._id !== product._id
        );
      }

      return [...items, product];
    });
  };

  // Check whether product is in wishlist
  const isInWishlist = (id) => {
    return wishlist.some(
      (item) => item._id === id
    );
  };

  const wishlistCount = wishlist.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error(
      "useWishlist must be used inside WishlistProvider. Check App.jsx."
    );
  }

  return context;
}